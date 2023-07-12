import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllCountries, sortCountriesAlphabetic } from "../utils";

export default async function Page() {
  const data = await getAllCountries().then((countries) =>
    sortCountriesAlphabetic(countries, true)
  );

  return (
    <section className="mx-auto max-w-screen-2xl grow py-20 pb-8">
      <h1 className="pb-8 text-lg font-medium sm:text-2xl md:text-3xl">Countries</h1>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
