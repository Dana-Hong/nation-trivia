import CountriesList from "./components/countrieslist";
import { getCountriesByRegion, sortCountriesAlphabetic } from "../utils";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Country } from "../types";
import { getAllCountries } from "../utils";

export default async function Page() {
  // const countries = await getCountriesByRegion("OCEANIA");
  // const sortedCountries = sortCountriesAlphabetic(countries, true);
  const data = await getAllCountries();

  return (
    <section className="grow">
      <DataTable columns={columns} data={data} />
      <CountriesList />
    </section>
  );
}
