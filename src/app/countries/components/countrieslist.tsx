"use client";

import { Fragment, useState, useEffect } from "react";
import Link from "next/link";

// components
import Filter from "./filter";
import Sort from "./sort";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

  const [selectedRegions, setSelectedRegions] = useState<Country[][] | null>(
    null
  );

  async function getFilteredRegions(
    filterStatus: FilterState,
    sortStatus: SortStatusState
  ) {
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
      const filteredRegions = await getFilteredRegions(
        filterStatus,
        sortStatus
      );
      setSelectedRegions(filteredRegions);
    })();
  }, [filterStatus, sortStatus]);

  const regionLists = selectedRegions?.map((region, i) => (
    <Fragment key={region[0].region}>
      <h3 className="text-3xl">{region[i].region}</h3>
      <ul>
        {region.map((country) => {
          const countryName = country.name.common.split(" ").join("-");
          return (
            <li key={countryName}>
              <Link href={`/countries/${countryName}`}>
                {country.name.common}
              </Link>
            </li>
          );
        })}
      </ul>
    </Fragment>
  ));

  return (
    <div>
      <div className="flex gap-2 justify-around">
        <Filter status={filterStatus} setFilterStatus={setFilterStatus} />
        <Select>
          <SelectTrigger className="bg-red-300 max-w-[300px]" >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem onClick={() => console.log('test3')} value="something">Alphabetical - Ascending</SelectItem>
            <SelectItem onClick={() => console.log('test')} value="something 2 ">Alphabetical - Descending</SelectItem>
            <SelectItem value="None">None</SelectItem>
          </SelectContent>
          </Select> 
        <Sort status={sortStatus} setSortStatus={setSortStatus} />
      </div>
      <div>{regionLists}</div>
    </div>
  );
}
