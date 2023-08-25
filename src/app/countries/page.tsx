import { getAllCountries } from "../utils";

import CountriesList from "./countries-list";

export default async function Page() {
  const countries = await getAllCountries();

  return (
    <section className="w-full pb-20">
      <h1 className="w-full px-4 py-8 text-2xl font-medium sm:px-6 sm:text-3xl md:text-4xl">
        Explore Countries
      </h1>
      <CountriesList data={countries} />
    </section>
  );
}
