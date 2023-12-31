"use client";

import { Fragment, useState, useEffect } from "react";
import Link from "next/link";

// components
import Filter from "./filter";
import Sort from "./sort";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// constants
import { REGIONS } from "@/app/constants/geography";

// types
import { Country, Region } from "../../types";

// utils
import { getCountriesByRegion, sortCountriesAlphabetic } from "@/app/utils";

export type SortStatusState = {
  open: boolean;
  currentOption: string;
};

export type FilterState = {
  open: boolean;
  checked: Region[];
};

export default function CountriesList() {
  const [filterStatus, setFilterStatus] = useState<FilterState>({
    open: false,
    checked: [...REGIONS],
  });

  const [sortStatus, setSortStatus] = useState({
    open: false,
    currentOption: "ascending",
  });

  const [selectedRegions, setSelectedRegions] = useState<Country[][] | null>(null);

  async function getFilteredRegions(filterStatus: FilterState, sortStatus: SortStatusState) {
    const ascending = sortStatus.currentOption === "Alphabetical - Ascending";
    const selectedRegions = filterStatus.checked;

    return Promise.all(
      selectedRegions.map(
        async (region) =>
          await getCountriesByRegion(region as Region).then((country) =>
            sortCountriesAlphabetic(country, ascending)
          )
      )
    );
  }

  useEffect(() => {
    (async () => {
      const filteredRegions = await getFilteredRegions(filterStatus, sortStatus);
      setSelectedRegions(filteredRegions);
    })();
  }, [filterStatus, sortStatus]);

  const regionLists = selectedRegions?.map((region, i) => (
    <Fragment key={region[0].region}>
      <h3 className="text-center text-3xl">{region[i].region}</h3>
      <ul>
        {region.map((country) => {
          const countryName = country.name.common.split(" ").join("-");
          return (
            <li key={countryName}>
              <Link href={`/countries/${countryName}`}>{countryName}</Link>
            </li>
          );
        })}
      </ul>
    </Fragment>
  ));

  return (
    <div>
      <div className="flex justify-around gap-2">
        <Filter status={filterStatus} setFilterStatus={setFilterStatus} />
        <DropdownMenu>
          <DropdownMenuTrigger>Sort By</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                setSortStatus({
                  currentOption: "ascending",
                  open: !sortStatus.open,
                })
              }
            >
              {"Alphabetical (ascending)"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setSortStatus({
                  currentOption: "descending",
                  open: !sortStatus.open,
                })
              }
            >
              {"Alphabetical (descending)"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sort status={sortStatus} setSortStatus={setSortStatus} />
      </div>
      <div className="px-4">{regionLists}</div>
    </div>
  );
}
