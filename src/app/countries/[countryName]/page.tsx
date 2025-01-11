import Link from "next/link";
import Image from "next/image";
import { getCountryByCode, getCountryByName } from "@/app/utils";

type Currency = {
  name: string;
  symbol: string;
};

export default async function Page({ params }: { params: { countryName: string } }) {
  const countryName = params.countryName.split("-").join(" ");
  const [country] = await getCountryByName(countryName);
  const currencies: Currency[] = country.currencies ? Object.values(country.currencies) : [];
  const languages: string[] = Object.values(country.languages);
  const borderCountryCodes: string[] | null =
    country?.borders !== undefined ? Object.values(country.borders) : null;

  const borderCountries: string[] | null = borderCountryCodes
    ? await Promise.all(
        borderCountryCodes.map(
          async (countryCode) =>
            await getCountryByCode(countryCode).then((country) => country[0].name.common)
        )
      )
    : null;

  function formatPopulation(population: number) {
    const populationString = population.toString().split("");
    const populationArray = populationString
      .reverse()
      .map((decimal, i) =>
        (i !== 0 || i === populationString.length - 1) && (i - 2) % 3 === 0
          ? `,${decimal}`
          : decimal
      )
      .reverse();
    if (populationArray[0].length === 2) populationArray[0] = populationArray[0][1];
    return populationArray.join("");
  }

  return (
    <main className="flex w-full max-w-screen-2xl flex-col gap-4 bg-blue-800 pt-12 sm:flex-row sm:pt-20">
      <section className="relative mx-auto flex w-full max-w-screen-2xl flex-col items-center bg-red-700 px-2">
        <h1 className="py-8 text-center text-2xl font-semibold sm:hidden">{country.name.common}</h1>
        <Image
          src={country.flags.png}
          alt={country.flags.png ?? `${country.name.common} flag`}
          height={200}
          width={600}
          className="rounded-md"
        />
      </section>
      <section className="mx-auto w-full max-w-screen-2xl bg-green-800 px-2">
        <h1 className="hidden bg-pink-500 pb-4 text-center text-2xl font-semibold sm:block md:text-left">
          {country.name.common}
        </h1>
        <div className="grid bg-teal-700 min-[375px]:grid-cols-2">
          <h2 className="col-span-full text-xl font-medium">Basic Info</h2>
          <div className="flex gap-2">
            <p className="font-semibold">Capital City:</p>
            <p>{`${country.capital ?? "N/A"}`}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Population:</p>
            <p>{formatPopulation(country.population)}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Region:</p>
            <p>{`${country.region}`}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">SubRegion:</p>
            <p>{`${country.subregion ?? "N/A"}`}</p>
          </div>
        </div>
        <div className="grid min-[375px]:grid-cols-2">
          <h2 className="col-span-full text-xl font-medium">Demographics</h2>
          <p className="font-semibold">Languages: </p>
          {languages.map((language) => {
            return (
              <p key={language}>{`${language}${
                languages.length > 1 && language != languages[languages.length - 1] ? "," : ""
              }`}</p>
            );
          })}
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Currency: </p>
          {currencies.length !== 0
            ? currencies?.map((currency) => <p key={currency.name}>{currency.name}</p>)
            : "N/A"}
        </div>
        <div className="bg-orange-700">
          <h2 className="col-span-full text-xl font-medium">Demographics</h2>
          <div className="grid grid-cols-2">
            <p className="font-semibold">
              Borders:
              {borderCountries
                ? borderCountries.map((borderingCountry: string) => (
                    <span key={borderingCountry} className="px-1">
                      <Link href={`/countries/${borderingCountry}`}>{borderingCountry}</Link>
                    </span>
                  ))
                : "None"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
