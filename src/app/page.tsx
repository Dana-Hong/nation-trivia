import Link from "next/link";
import Image from "next/image";
import Earth from "../../public/earth-placeholder.jpg";
import Globe1 from "../../public/globe-1.jpg";
import Globe2 from "../../public/globe-2.jpg";
import Globe2NoBG from "../../public/globe-2-nobg.png";
import Compass from "@/components/icons/compass";
import Book from "@/components/icons/book";
import { getAllCountries, getCountriesByRegion } from "./utils";
import { REGIONS } from "./constants/geography";

// components
import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@/components/ui/button";

// async function listCountriesByRegion() {
//   const regions = REGIONS;
//   const regionData = await Promise.all(
//     regions.map(
//       async (region) =>
//         await getCountriesByRegion(region).then((countries) =>
//           sortCountriesAlphabetic(countries, true)
//         )
//     )
//   );

//   return regionData.map((region, i) => (
//     <div key={region[i].region}>
//       <p className="text-3xl">{region[i].region}</p>
//       <ul>
//         {region.map((country: Country) => (
//           <li key={country.name.common}>
//             <p>{country.name.common}</p>
//             <p>{country.cca3}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   ));
// }

// function sortCountriesAlphabetic(countriesList: Country[], ascending: boolean) {
//   return countriesList.sort((a: Country, b: Country) => {
//     if (ascending) return a.name.common.localeCompare(b.name.common);
//     return b.name.common.localeCompare(a.name.common);
//   });
// }

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

export default async function Home() {
  // const fetchedRegion = await getCountriesByRegion("EUROPE");
  // console.dir(fetchedRegion, { depth: null });
  // const data = await getAllCountries();

  // const sortedCountries = sortCountriesAlphabetic(fetchedRegion, true).map((country: Country) => (
  //   <li key={country.name.common}>
  //     <p>{country.name.common}</p>
  //     <Image
  //       src={country.flags.svg}
  //       alt={country.flags.alt ?? `${country.name.common} flag`}
  //       width={200}
  //       height={120}
  //     />
  //   </li>
  // ));

  return (
    <>
      <Header />
      <main className="flex grow flex-col gap-2">
        <section className="flex flex-col items-center gap-4 px-2 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32">
          <h1 className="text-center text-3xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
            Nation Trivia{" "}
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Unravel the World, One Flag at a Time
            </span>
          </h1>
          <p className="max-w-2xl leading-normal sm:text-lg sm:leading-8">
            Are you ready to test your geography skills? Start your global journey and conquer our
            nation trivia now!
          </p>
          {/* <div className="mx-auto flex max-w-[70vw] items-center gap-2">
            <Link className="inline-block" href={"/quizzes"}>
              <Button className="w-full">Quiz</Button>
            </Link>
            <Link className="inline-block" href={"/countries"}>
              <Button className="w-full truncate">Countries Database</Button>
            </Link>
          </div> */}
          <Image src={Globe2NoBG} alt="globe" priority />
        </section>
        <section className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 pb-8 sm:flex-row sm:gap-6 md:gap-10 md:pb-12 lg:pb-32">
          <div className="flex max-w-md flex-col justify-between gap-2 rounded-md border px-6 py-7 hover:bg-zinc-900">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">Explore the World</h2>
              <Compass className="order-first h-8 w-8 fill-sky-500" />
            </div>
            <p className="max-w-lg text-sm md:text-base">
              If curiosity is your compass, then our Explore feature is your map. Dig into our
              treasure trove of country details. Every fact you uncover is another sparkle on your
              crown of global knowledge. Your voyage of discovery begins now!
            </p>
            <Button className="w-fit self-center p-0">
              <Link
                href={"/countries"}
                className="flex h-full w-full items-center justify-center rounded-md px-3 py-2"
              >
                <span>Discover Countries</span>
              </Link>
            </Button>
          </div>
          <div className="flex max-w-md flex-col justify-between gap-6 rounded-md border p-8 hover:bg-zinc-900">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">Test your Knowledge</h2>
              <Book className="order-first h-8 w-8 fill-red-500" />
            </div>
            <p className="max-w-lg text-sm md:text-base">
              Igniting the Geo-Gaming Revolution Flag Quiz is not just a game, it&apos;s a thrilling
              leap into geography. Test your prowess on capital cities, flag identification, or
              explore an encyclopedia of countries at your fingertips.
            </p>
            <Button className="w-fit self-center p-0">
              <Link
                href={"/quizzese"}
                className="flex h-full w-full items-center justify-center rounded-md px-3 py-2"
              >
                <span>Try out Quizzes</span>
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
