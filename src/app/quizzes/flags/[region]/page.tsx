"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Country, Region } from "@/app/types";
import { getCountriesByRegion } from "@/app/utils";

type QuizType = {
  correctAnswer: Country;
  wrongAnswers: Country[];
};

type QuizOption = {
  name: string;
  correctAnswer: boolean;
  flags?: { png: string; svg?: string; alt?: string };
};

export default function Page({ params }: { params: { region: string } }) {
  const numberOfFlags = useRef(0);
  const [countries, setCountries] = useState<Country[]>([]);
  const [correctlyGuessed, setCorrectlyGuessed] = useState<string[]>([]);
  const [quizOptions, setQuizOptions] = useState<QuizOption[] | null>(null);
  const region = params.region;
  /**
   * have a counter that says number of correct / total flags
   * have a hidden counter that is displayed when you quit or finish the quiz that tells you what flags you guessed wrong, and number of incorrect guesses
   * each question should have ONE correct answer.
   * the correctly guessed flags should not show up in the potential wrong answers pool if there are more than <difficulty> questions left
   *
   */
  function handleClick(quizOptions: QuizOption[], countryName: string) {
    const option = quizOptions.filter(
      (option) => option.name === countryName
    )[0];
    if (option.correctAnswer) {
      setCountries((c) =>
        c.filter((country) => country.name.common !== option.name)
      );
      setCorrectlyGuessed((cg) => [...cg, option.name]);
      return;
    }
    setCountries((c) => c.map((c) => c).sort((a, b) => 0.5 - Math.random()));
  }

  function generateQuizQuestion(countries: Country[], difficulty: number) {
    console.log(countries.length);
    if (countries.length === 0) return null;
    const quizSet = new Set<number>();

    let current = 0;

    while (current < 10) {
      if (quizSet.size === difficulty) break;
      const randomIndex = Math.floor(Math.random() * countries.length);
      quizSet.add(randomIndex);
      current++;
    }

    const quizList = Array.from(quizSet)
      .map((randomIndex, i) => {
        const randomCountry = countries[randomIndex];
        return i === 0
          ? {
              name: randomCountry.name.common,
              correctAnswer: true,
              flags: { ...randomCountry.flags },
            }
          : { name: randomCountry.name.common, correctAnswer: false };
      })
      .sort((a, b) => 0.5 - Math.random());

    return quizList;
  }

  // console.log("1");
  // console.log("6", countries);

  useEffect(() => {
    // console.log("2");
    (async () => {
      const countriesList = await getCountriesByRegion(region as Region);
      // console.log("3:", countriesList);
      setCountries(countriesList);
      if (numberOfFlags.current < countriesList.length)
        numberOfFlags.current = countriesList.length;
    })();
    // console.log("this shouldn't be here");
  }, []);

  useEffect(() => {
    console.log("4");
    const quizOptionsList = generateQuizQuestion(countries, 6);
    console.log("5:", quizOptions);
    console.log("7: this should be filled", quizOptions);
    setQuizOptions(quizOptionsList);
  }, [countries]);

  const correctCountry =
    quizOptions !== null
      ? quizOptions!.filter((option) => option.correctAnswer)[0]
      : null;

  return (
    <div className="max-w-[1440px] w-full grow bg-red-300 mx-auto flex flex-col gap-10 items-center">
      <p className="pt-20">{`${correctlyGuessed.length}/${numberOfFlags.current}`}</p>
      {countries.length === 0 ? (
        <p>Game over!</p>
      ) : (
        <div>
          {correctCountry !== null && (
            <div className="relative h-56 w-[398px]">
              <Image
                src={correctCountry.flags!.png}
                alt={
                  correctCountry?.flags?.alt ?? `${correctCountry.name} flag`
                }
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div className="border grid grid-cols-2 gap-3 max-w-lg w-full pt-12">
            {quizOptions !== null &&
              quizOptions.map((country) => (
                <button
                  className="inline-flex items-center justify-center py-2 px-3 rounded-md ring-[1px] wrap"
                  key={country.name}
                  onClick={() => {
                    handleClick(quizOptions, country.name);
                  }}
                >
                  {country.name}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
