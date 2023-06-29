import { Region, Regions } from "@/app/types";
import { FilterStatusState, SortStatusState } from "./countrieslist";
import { getCountriesByRegion, sortCountriesAlphabetic } from "@/app/utils";

type ListProps = {
  filterStatus: FilterStatusState;
  sortStatus: SortStatusState;
};

async function getFilteredCountries(
  filterStatus: FilterStatusState,
  sortStatus: SortStatusState
) {
  const ascending = sortStatus.currentOption === "ascending";
  const selectedRegions = Object.entries(filterStatus)
    .filter((entry) => entry[0] !== "open" && entry[0] !== "all" && entry[1])
    .map((entry) => entry[0]);
  return Promise.all(
    selectedRegions.map(
      async (region) =>
        await getCountriesByRegion(region as Region).then((country) =>
          sortCountriesAlphabetic(country, ascending)
        )
    )
  );
}

export default async function List({ filterStatus, sortStatus }): ListProps {
  //   const data = await Promise.all(
  //     seletedRegions.map(
  //       async (region: Region) =>
  //          getCountriesByRegion(region).then((country) =>
  //           sortCountriesAlphabetic(country, sortStatus.currentOption)
  //         )
  //     )
  //   );

  const countriesInRegion = getCountriesByRegion(filterStatus);
  return <div>{countriesInRegion}</div>;
}
