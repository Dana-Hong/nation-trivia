"use client";

import { SORT_OPTIONS } from "../../constants/geography";
import { SortStatusState } from "./countrieslist";

type SortProps = {
  name?: string;
  status: SortStatusState;
  setSortStatus: React.Dispatch<React.SetStateAction<SortStatusState>>;
  className?: string;
};

export default function Sort({ className, status, setSortStatus }: SortProps) {
  const dropdownOptions = SORT_OPTIONS.map((option) => (
    <li key={option}>
      <button
        className="inline-flex w-full px-4 py-2 text-sm truncate"
        onClick={() =>
          setSortStatus({ currentOption: option, open: !status.open })
        }
      >
        {option}
      </button>
    </li>
  ));

  return (
    <div className={`flex relative ${className}`}>
      <button
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
        onClick={() => setSortStatus({ ...status, open: !status.open })}
      >
        Sort by
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={`absolute top-full z-10 ${
          !status.open ? "hidden" : ""
        } bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-red-500`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="states-button"
        >
          {dropdownOptions}
          <li key="Select Region">
            <button
              className="inline-flex w-full px-4 py-2 text-sm"
              onClick={(e) =>
                setSortStatus({
                  open: false,
                  currentOption: "Alphabetical - Ascending",
                })
              }
            >
              None
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
