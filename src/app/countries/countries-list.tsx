"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Country } from "../types";
import { searchCountryByName, filterCountriesByContinent, sortCountries } from "../utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { ChevronDown } from "lucide-react";

type CountryProps = {
  data: any;
};

export type Continents = {
  all: boolean;
  Antarctica: boolean;
  Africa: boolean;
  Asia: boolean;
  Europe: boolean;
  "North America": boolean;
  Oceania: boolean;
  "South America": boolean;
};

export default function CountriesList({ data }: CountryProps) {
  const [filteredContinents, setFilteredContinents] = useState({
    Antarctica: false,
    Africa: false,
    Asia: false,
    Europe: false,
    "North America": false,
    Oceania: false,
    "South America": false,
    all: true,
  });
  const [search, setSearch] = useState<string>("");
  const [sortStatus, setSortStatus] = useState<string>("nameAsc");

  const {
    all,
    Antarctica,
    Africa,
    Asia,
    Europe,
    Oceania,
    "North America": NorthAmerica,
    "South America": SouthAmerica,
  } = filteredContinents;

  function handleCheckedChange(name: string) {
    return () => {
      if (name !== "all") {
        setFilteredContinents((c) => {
          const otherOptions = Object.entries(c)
            .filter((option) => option[0] !== "all")
            .every((option) => option[1]);
          return {
            ...c,
            all: otherOptions ? true : false,
            [name]: !c[name as keyof Continents],
          };
        });
        return;
      }

      setFilteredContinents((c) => {
        const otherOptionsOff = c.all;
        if (otherOptionsOff) {
          return {
            Antarctica: false,
            Africa: false,
            Asia: false,
            Europe: false,
            "North America": false,
            Oceania: false,
            "South America": false,
            all: false,
          };
        }
        return {
          Antarctica: false,
          Africa: false,
          Asia: false,
          Europe: false,
          "North America": false,
          Oceania: false,
          "South America": false,
          all: true,
        };
      });
    };
  }

  function handleSortSelect(name: string) {
    setSortStatus(name);
  }

  function formatPopulation(population: number) {
    // return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (population >= 1_000 && population <= 1_000_000) {
      return `${Math.round(population / 1_000)}K`;
    } else if (population >= 1_000_000 && population <= 1_000_000_000) {
      return `${Math.round(population / 1_000_000)}M`;
    } else if (population >= 1_000_000_000 && population <= 1_000_000_000_000) {
      return `${Math.round(population / 1_000_000_000)}B`;
    }
    // return population.toLocaleString();
  }

  const filteredCountries = filterCountriesByContinent(data, filteredContinents);
  const sortedCountries = sortCountries(filteredCountries, sortStatus);
  const searchedCountries = searchCountryByName(sortedCountries as Country[], search);

  const countriesList = searchedCountries!.map((country) => {
    return (
      <Link
        href={`/countries/${country.name.common}`}
        key={country.name.common}
        className="flex w-full cursor-pointer flex-col rounded-md bg-zinc-800 transition-transform hover:scale-105"
      >
        <div className="p-6 pt-3 text-sm">
          <p className="pb-2 text-2xl font-bold">{country.name.common}</p>
          <p>
            <span className="font-semibold">Population: </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-xs">
                  {formatPopulation(country.population)}
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-xs">{country.population.toLocaleString()}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
          <p>
            <span className="font-semibold">Region: </span>
            <span className="text-xs">{country.region}</span>
          </p>
          <p>
            <span className="font-semibold">Capital: </span>
            <span className="text-xs">{country.capital}</span>
          </p>
        </div>
        <Image
          src={country.flags.png}
          alt={country.flags.alt ?? `${country.name.common} flag`}
          className="order-first aspect-[16/9] h-full w-full rounded-t-md bg-zinc-950 object-cover"
          height={300}
          width={300}
        />
      </Link>
    );
  });

  return (
    <section className="w-full">
      <div className="flex w-full flex-col justify-between gap-2 px-2 pt-2 min-[375px]:px-6 min-[656px]:flex-row">
        <Input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-[380px]"
        />
        <div className="min-[380px]:flex-Col flex grow justify-between gap-2 min-[704px]:flex-row md:max-w-[380px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="grow basis-1/2">
              <Button variant="outline">
                <span className="flex w-full justify-between gap-2 truncate">
                  Sort by: <ChevronDown size={20} />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={sortStatus === "nameAsc"}
                onCheckedChange={() => handleSortSelect("nameAsc")}
              >
                Name &#40;asc&#41;
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortStatus === "nameDesc"}
                onCheckedChange={() => handleSortSelect("nameDesc")}
              >
                Name &#40;desc&#41;
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="grow basis-1/2">
              <Button variant="outline">
                <span className="flex w-full justify-between gap-2 truncate">
                  Filter by: <ChevronDown size={20} />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuCheckboxItem
                checked={Antarctica}
                onCheckedChange={handleCheckedChange("Antarctica")}
              >
                Antarctica
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={Africa}
                onCheckedChange={handleCheckedChange("Africa")}
              >
                Africa
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={Asia}
                onCheckedChange={handleCheckedChange("Asia")}
              >
                Asia
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={Europe}
                onCheckedChange={handleCheckedChange("Europe")}
              >
                Europe
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={Oceania}
                onCheckedChange={handleCheckedChange("Oceania")}
              >
                Oceania
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={NorthAmerica}
                onCheckedChange={handleCheckedChange("North America")}
              >
                North America
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={SouthAmerica}
                onCheckedChange={handleCheckedChange("South America")}
              >
                South America
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={all} onCheckedChange={handleCheckedChange("all")}>
                All
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <section className="grid grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))] justify-items-center gap-4 px-2 pt-8 min-[375px]:px-6 sm:px-6 lg:gap-6">
        {countriesList}
      </section>
      {/* <section className="grid grid-cols-auto-fill justify-items-center gap-8 pt-4 sm:px-6 lg:gap-20">
        {countriesList}
      </section> */}
    </section>
  );
}
