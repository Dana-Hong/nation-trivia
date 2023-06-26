import Link from "next/link";
import Dropdown from "../components/dropdown";
import DropdownSelect from "../components/dropdownselect";
import List from "../components/list";
import { getCountriesByRegion } from "../utils";
import { Country } from "../types";

export default async function Page() {
  const countries = await getCountriesByRegion("OCEANIA");
  const sortCountriesAlphabetic(countries, tr);
  // const countriesList = countries.map((country: Country) => (
  //   <li key={country.name.common}>{country.name.common}</li>
  // ));
  return (
    <div className="grow">
      {/* <div className="flex flex-col pt-4">
      Filter:
      
      Americas
      Europe
      Africa
      Oceania
      Sort by:
      </div> */}
      {/* <div>
        <button>Alphabetical (asc)</button>
        <button>Alphabetical (desc)</button>
        <button>Oldest</button>
        <button>Newest</button>
        <button>Largest (Area)</button>
        <button>Smallest (Area)</button>
        <button>Largest (Population)</button>
        <button>Smallest (Population)</button>
      </div> */}
      <DropdownSelect name="Region" />
      <DropdownSelect name="Currency" />
      <div>
        <p>Countries List:</p>
        {/* {countriesList} */}
        <List countries={countries}/>

      </div>
    </div>
  );
}
