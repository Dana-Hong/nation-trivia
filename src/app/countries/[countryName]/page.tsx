import Link from "next/link";
import Image from "next/image";
import { Country } from "@/app/types";
import { getCountryByCode, getCountryByName } from "@/app/utils";

type Currency = {
  name: string;
  symbol: string;
};

type Languages = {};

export default async function Page({
  params,
}: {
  params: { countryName: string };
}) {
  const countryName = params.countryName.split("-").join(" ");
  const [country] = await getCountryByName(countryName);
  const currencies: Currency[] = Object.values(country.currencies);
  const languages: string[] = Object.values(country.languages);
  const borderCountryCodes: string[] | null =
    Object.values(country.borders) ?? null;

  const borderCountries: string[] | null = borderCountryCodes
    ? await Promise.all(
        borderCountryCodes.map(
          async (countryCode) =>
            await getCountryByCode(countryCode).then(
              (country) => country[0].name.common
            )
        )
      )
    : null;

  return (
    <main className="bg-red-300 grow flex flex-col gap-4">
      <section className="flex flex-col items-center w-[80%] mx-auto">
        <h1 className="text-center text-2xl font-semibold">
          {country.name.common}
        </h1>
        <div className="relative h-40 w-80">
          <Image
            src={country.flags.png}
            alt={country.flags.png ?? `${country.name.common} flag`}
            fill={true}
            style={{ objectFit: "cover" }}
            // height={120}
            // width={200}
          />
        </div>
      </section>
      <section className="bg-green-200 mx-auto w-[80%]">
        <div className="flex gap-2">
          <p className="font-semibold">Capital City:</p>
          <p>{`${country.capital}`}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Population:</p>
          <p>{country.population}</p>
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
                  <Link href={`/countries/${borderingCountry}`}>
                    {borderingCountry}
                  </Link>
                </span>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
