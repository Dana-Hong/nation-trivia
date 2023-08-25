"use client";
import { useState, isValidElement, ReactNode, cloneElement, ReactElement } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Country } from "../types";
import { filterCountriesByContinent, sortCountries, sortCountriesAlphabetic } from "../utils";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Checked = DropdownMenuCheckboxItemProps["checked"];

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

  const filteredCountries = filterCountriesByContinent(data, filteredContinents);
  const sortedCountries = sortCountries(filteredCountries, sortStatus);
  console.log(sortedCountries);

  const countriesList = sortedCountries!.map((country) => {
    return (
      <Link
        href={`/countries/${country.name.common}`}
        key={country.name.common}
        className="relative flex cursor-pointer flex-col rounded-md bg-zinc-800 transition-transform hover:scale-105"
      >
        <div className="p-6 text-sm">
          <p className="max-w-[252px] text-lg font-bold">{country.name.common}</p>
          <p>
            <span className="text-base font-semibold">Population: </span>
            {country.population}
          </p>
          <p>
            <span className="text-base font-semibold">Region: </span>
            {country.region}
          </p>
          <p>
            <span className="text-base font-semibold">Capital: </span>
            {country.capital}
          </p>
        </div>
        <Image
          src={country.flags.png}
          alt={country.flags.alt ?? `${country.name.common} flag`}
          className="order-first rounded-t-md"
          height={200}
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

      <section className="grid grid-cols-auto-fill justify-items-center gap-8 pt-4 sm:px-6 lg:gap-20">
        {countriesList}
      </section>
    </section>
  );
}
