import Link from "next/link";
import Image from "next/image";
import Earth from "../../public/earth-placeholder.jpg";
import { getAllCountries, getCountriesByRegion } from "./utils";
import { REGIONS } from "./constants/geography";
// components
import Header from "./components/header";
import Footer from "./components/footer";
import { Button } from "@/components/ui/button";

async function listCountriesByRegion() {
  const regions = REGIONS;
  const regionData = await Promise.all(
    regions.map(
      async (region) =>
        await getCountriesByRegion(region).then((countries) =>
          sortCountriesAlphabetic(countries, true)
        )
    )
  );

  return regionData.map((region, i) => (
    <div key={region[i].region}>
      <p className="text-3xl">{region[i].region}</p>
      <ul>
        {region.map((country: Country) => (
          <li key={country.name.common}>
            <p>{country.name.common}</p>
            <p>{country.cca3}</p>
          </li>
        ))}
      </ul>
    </div>
  ));
}

function sortCountriesAlphabetic(countriesList: Country[], ascending: boolean) {
  return countriesList.sort((a: Country, b: Country) => {
    if (ascending) return a.name.common.localeCompare(b.name.common);
    return b.name.common.localeCompare(a.name.common);
  });
}

type Flags = {
  png: string;
  svg: string;
  alt?: string;
};

type Country = {
  name: {
    common: string;
  };
  cca3: string;
  flags: Flags;
  region: string;
  subregion: string;
};

// type Region = "africa" | "americas" | "asia" | "europe" | "oceania";

export default async function Home() {
  const fetchedRegion = await getCountriesByRegion("EUROPE");
  console.dir(fetchedRegion, { depth: null });
  const data = await getAllCountries();

  const sortedCountries = sortCountriesAlphabetic(fetchedRegion, true).map((country: Country) => (
    <li key={country.name.common}>
      <p>{country.name.common}</p>
      <Image
        src={country.flags.svg}
        alt={country.flags.alt ?? `${country.name.common} flag`}
        width={200}
        height={120}
      />
    </li>
  ));

  return (
    <>
      <Header />
      <main className="bg-blue- grow flex flex-col justify-center gap-2">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl text-center">Nation Trivia</h1>
          <Image src={Earth} alt="Earth" />
        </section>
        <div className="flex flex-col max-w-[70vw] mx-auto gap-2">
          <Link
            className="inline-block"
            href={"/quizzes"}
          >
            <Button className="w-full">Quiz</Button>
          </Link>
          <Link
            className="inline-block"
            href={"/countries"}
          >
            <Button className="w-full">Countries Database</Button>
          </Link>
        </div>
        <div>{listCountriesByRegion()}</div>
        {/* <div>{sortedCountries}</div> */}
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">{listCountriesByRegion()}L</div> */}
        {/* <ul className="grid grid-cols-2">{sortedCountries}</ul> */}
        <p>{/* {data[0].name.official} */}</p>
        {/* <Image src={`${data[0].flags.svg}`} alt={data[0].flags.alt} width={120} height={120}/> */}
      </main>
      <Footer />
    </>
  );
}
