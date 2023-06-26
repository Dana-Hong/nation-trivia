import { Region } from "./types";
import { REST_COUNTRIES_URL } from "./constants/geography";

export async function getAllCountries() {
  const response = await fetch(`${REST_COUNTRIES_URL}all`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = response.json();
  return data;
}

export async function getCountriesByRegion(region: Region) {
    const formattedRegion = region.toLocaleLowerCase();
  const response = await fetch(`${REST_COUNTRIES_URL}/region/${formattedRegion}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries in ${region}`);
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


export function sortCountriesAlphabetic(countriesList: Country[], ascending: boolean) {
  return countriesList.sort((a: Country, b: Country) => {
    if (ascending) return a.name.common.localeCompare(b.name.common);
    return b.name.common.localeCompare(a.name.common);
  });
}