import { Region } from "./types";
import { Country } from "./types";
import { REST_COUNTRIES_URL } from "./constants/geography";
import { Continents } from "./countries/countries-list";

export async function getAllCountries() {
  const response = await fetch(`${REST_COUNTRIES_URL}/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = response.json();
  return data;
}

export async function getCountryByCode(code: string) {
  const response = await fetch(`${REST_COUNTRIES_URL}/alpha?codes=${code}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch country data`);
  }

  const data = response.json();

  return data;
}

export async function getCountryByName(name: string) {
  const countryName = name.split(" ").join("%20");
  const response = await fetch(`${REST_COUNTRIES_URL}/name/${countryName}/?fullText=true`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${name}`);
  }

  const data = response.json();

  return data;
}

export async function getCountriesByRegion(region: Region, noCache?: boolean) {
  const formattedRegion = region.toLocaleLowerCase();
  const response = noCache
    ? await fetch(`${REST_COUNTRIES_URL}/region/${formattedRegion}`, { next: { revalidate: 0 } })
    : await fetch(`${REST_COUNTRIES_URL}/region/${formattedRegion}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries in the region of ${region}`);
  }

  const data = response.json();
  return data;
}

export async function getCountriesByCapital(capital: string) {
  const response = await fetch(`${REST_COUNTRIES_URL}/capital/${capital}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch the country with the capital city of ${capital}`);
  }

  const data = response.json();
  return data;
}

export function searchCountryByName(countriesList: Country[], name: string) {
  const sanitizedInput = name.toLocaleLowerCase();
  const searchResult = countriesList.filter((country) => {
    const countryName = country.name.common.toLocaleLowerCase().slice(0, sanitizedInput.length);
    return sanitizedInput === countryName;
  });

  return searchResult;
}

export function sortCountries(countriesList: Country[], sortValue: string) {
  if (sortValue === "nameAsc") {
    return sortCountriesAlphabetic(countriesList, true);
  } else if (sortValue === "nameDesc") {
    return sortCountriesAlphabetic(countriesList, false);
  }
}

export function sortCountriesAlphabetic(countriesList: Country[], ascending: boolean) {
  return countriesList.sort((a: Country, b: Country) => {
    if (ascending) return a.name.common.localeCompare(b.name.common);
    return b.name.common.localeCompare(a.name.common);
  });
}

export function filterCountriesByContinent(countriesList: Country[], continent: Continents) {
  if (continent.all) return countriesList;
  const filteredCountries = countriesList.filter((country) => {
    for (let i = 0; i < country.continents.length; i++) {
      if (continent[country.continents[i] as keyof Continents]) return true;
    }

    return false;
  });

  return filteredCountries;
}

export async function getMultiChoiceQuiz(region: Region, difficulty: number) {
  const countries: Country[] = await getCountriesByRegion(region);
  const quizSet = new Set<Country>();
  let current = 0;
  while (current < 10) {
    if (quizSet.size === difficulty) break;
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    quizSet.add(randomCountry);
  }

  const quizList = Array.from(quizSet);

  const quizQuestion = {
    correctAnswer: quizList[0],
    wrongAnswers: quizList.slice(1),
  };

  return quizQuestion;
}
