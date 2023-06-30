import CountriesList from "./components/countrieslist";
import { getCountriesByRegion, sortCountriesAlphabetic } from "../utils";

export default async function Page() {
  // const countries = await getCountriesByRegion("OCEANIA");
  // const sortedCountries = sortCountriesAlphabetic(countries, true);

  return (
    <div className="grow">
      <div>
        <CountriesList />
      </div>
    </div>
  );
}