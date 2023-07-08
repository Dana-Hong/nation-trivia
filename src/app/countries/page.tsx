import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllCountries, sortCountriesAlphabetic } from "../utils";

export default async function Page() {
  const data = await getAllCountries().then(countries => sortCountriesAlphabetic(countries, true));

  return (
    <section className="grow py-20">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-medium max-w-screen-2xl mx-auto pb-8">Countries</h1>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
