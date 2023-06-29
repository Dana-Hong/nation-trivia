"use client";

import Checkbox from "./checkbox";
import { Region } from "@/app/types";
import { REGIONS } from "@/app/constants/geography";
import { FilterState } from "./countrieslist";

type FilterProps = {
  status: FilterState;
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterState>>;
};

export default function Filter({ status, setFilterStatus }: FilterProps) {
  const options = REGIONS.map((region) => (
    <li key={region}>
      <Checkbox
        status={status}
        setStatus={setFilterStatus}
        value={region as Region}
      />
    </li>
  ));

  return (
    <div>
      <button
        id="dropdownCheckboxButton"
        data-dropdown-toggle="dropdownDefaultCheckbox"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setFilterStatus({ ...status, open: !status.open })}
      >
        Filter by
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        id="dropdownDefaultCheckbox"
        className={`absolute z-10 ${
          !status.open ? "hidden" : ""
        } bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-green-700 dark:divide-gray-600`}
      >
        <ul
          className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownCheckboxButton"
        >
          {options}
          <li key={"All"}>
            <Checkbox status={status} setStatus={setFilterStatus} value="All" />
          </li>
        </ul>
      </div>
    </div>
  );
}
