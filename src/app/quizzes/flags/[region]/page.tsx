"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Country, Region } from "@/app/types";
import { getAllCountries, getCountriesByRegion } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
  const staticCountries = useRef<Country[] | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [correctlyGuessed, setCorrectlyGuessed] = useState<string[]>([]);
  const [incorrectlyGuessed, setIncorrectlyGuessed] = useState<Set<Country>>(new Set());
  const [quizOptions, setQuizOptions] = useState<QuizOption[] | null>(null);
  const region = params.region;

  function handleClick(quizOptions: QuizOption[], countryName: string) {
    const option = quizOptions.filter((option) => option.name === countryName)[0];
    if (option.correctAnswer) {
      setCountries((c) => c.filter((country) => country.name.common !== option.name));
      setCorrectlyGuessed((cg) => [...cg, option.name]);
      return;
    }
    setIncorrectlyGuessed((ig) =>
      ig.add(countries.filter((c) => c.name.common === countryName)[0])
    );
    setCountries((c) => c.map((c) => c).sort((a, b) => 0.5 - Math.random()));
  }

  function generateQuizQuestion(countries: Country[], difficulty: number) {
    if (countries.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    const correctAnswer = {
      name: randomCountry.name.common,
      correctAnswer: true,
      flags: { ...randomCountry.flags },
    };

    const countriesExcludingSelected = staticCountries!
      .current!.filter((country) => country.name.common !== correctAnswer.name)
      .sort((a, b) => 0.5 - Math.random())
      .map((country) => ({
        name: country.name.common,
        correctAnswer: false,
        flags: { ...country.flags },
      }))
      .slice(0, difficulty - 1);

    countriesExcludingSelected.push(correctAnswer);
    const quizList = countriesExcludingSelected.sort((a, b) => 0.5 - Math.random());

    return quizList;
  }

  useEffect(() => {
    (async () => {
      const countriesList =
        region === "all" ? await getAllCountries() : await getCountriesByRegion(region as Region);
      setCountries(countriesList);
      if (numberOfFlags.current < countriesList.length)
        numberOfFlags.current = countriesList.length;
      if (!staticCountries.current) staticCountries.current = countriesList;
    })();
  }, []);

  useEffect(() => {
    const quizOptionsList = generateQuizQuestion(countries, 6);
    setQuizOptions(quizOptionsList);
  }, [countries]);

  async function handleReset() {
    const countriesList = await getCountriesByRegion(region as Region);
    setCountries(countriesList);
    setCorrectlyGuessed((cg) => []);
    setIncorrectlyGuessed(new Set());
  }

  const correctCountry =
    quizOptions !== null ? quizOptions!.filter((option) => option.correctAnswer)[0] : null;

  const progress = Math.floor((correctlyGuessed.length / numberOfFlags.current) * 100);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] grow flex-col items-center">
      <div className="flex w-full max-w-3xl justify-between gap-2 pt-2 md:pt-4 lg:pt-8">
        <Link href="/quizzes/flags">
          <Button variant={"ghost"}>Back</Button>
        </Link>
        <Button variant={"ghost"}>Quit</Button>
      </div>
      {countries.length === 0 ? (
        <div className="flex grow flex-col gap-4 py-6">
          <div className="space-y-6">
            <p className="text-center text-2xl font-semibold">Game over!</p>
            <div className="flex justify-center gap-2">
              <Link href="/quizzes/flags">
                <Button>Guess More Regions</Button>
              </Link>
              <Link href={`/quizzes/flags/${region}`}>
                <Button onClick={handleReset}>Replay</Button>
              </Link>
            </div>
          </div>
          <p className="border-b pb-2 text-center font-medium">Incorrect Guesses:</p>
          <ul className="md: grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from(incorrectlyGuessed)
              .filter((country) => country !== undefined)
              .map((country) => (
                <li key={country.name.common} className="flex flex-col items-center gap-2 md:gap-4">
                  <p className="text-center text-sm font-medium">
                    {country?.name?.common || "nothing"}
                  </p>
                  <div className="relative h-20 w-32 md:h-28 md:w-48">
                    <Image
                      src={country.flags.svg ?? country.flags.png}
                      alt={country.flags.alt ?? `${country.name.common} flag`}
                      fill={true}
                      sizes="(max-width: 128px)"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="flex w-full grow flex-col items-center justify-center gap-8">
          <div className="lg:pt- w-full max-w-3xl space-y-4 pt-2 md:pt-4">
            <p className="text-center text-lg">{`${correctlyGuessed.length}/${numberOfFlags.current}`}</p>
            <Progress value={progress} className="h-2 w-full" />
          </div>
          <div className="flex grow flex-col gap-12">
            {correctCountry !== null && (
              <div className="relative mx-auto h-40 w-60 md:h-52 md:w-96">
                <Image
                  src={correctCountry.flags!.png}
                  alt={correctCountry?.flags?.alt ?? `${correctCountry.name} flag`}
                  fill={true}
                  sizes="(max-width: 128px)"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <div className="grid w-full max-w-lg grid-cols-2 gap-3 px-4 pt-8">
              {quizOptions !== null &&
                quizOptions.map((country) => (
                  <Button
                    variant="outline"
                    key={country.name}
                    onClick={() => {
                      handleClick(quizOptions, country.name);
                    }}
                  >
                    {country.name}
                  </Button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
