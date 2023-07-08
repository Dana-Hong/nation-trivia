import Link from "next/link";
import Image from "next/image";
import { Country } from "@/app/types";
import { getCountryByCode, getCountryByName } from "@/app/utils";

type Currency = {
  name: string;
  symbol: string;
};

type Languages = {};

export default async function Page({ params }: { params: { countryName: string } }) {
  const countryName = params.countryName.split("-").join(" ");
  const [country] = await getCountryByName(countryName);
  const currencies: Currency[] = Object.values(country.currencies);
  const languages: string[] = Object.values(country.languages);
  console.log(country);
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
    <main className="flex grow flex-col gap-4">
      <section className="mx-auto flex w-full max-w-screen-2xl flex-col items-center bg-sky-500">
        <h1 className="text-center text-2xl font-semibold">{country.name.common}</h1>
        <div className="relative h-40 w-80">
          <Image
            src={country.flags.png}
            alt={country.flags.png ?? `${country.name.common} flag`}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
      <section className="mx-auto w-full max-w-screen-2xl bg-green-200 ">
        <div className="flex gap-2">
          <p className="font-semibold">Capital City:</p>
          <p>{`${country.capital}`}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Population:</p>
          <p>{formatPopulation(country.population)}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Languages: </p>
          {languages.map((language) => (
            <p key={language}>{language}</p>
          ))}
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Currency: </p>
          {currencies.map((currency) => (
            <p key={currency.name}>{currency.name}</p>
          ))}
        </div>

        <div className="flex gap-2">
          <p className="font-semibold">Region:</p>
          <p>{`${country.region}`}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">SubRegion:</p>
          <p>{`${country.subregion}`}</p>
        </div>
        <div>
          <p className="font-semibold">Borders:</p>
          <div className="flex flex-col">
            {borderCountries &&
              borderCountries.map((borderingCountry: string) => (
                <span key={borderingCountry} className="inline-block">
                  <Link href={`/countries/${borderingCountry}`}>{borderingCountry}</Link>
                </span>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
