// constants
import { REGIONS } from "@/app/constants/geography";
// types
import { FilterState } from "./countrieslist";
import { Region } from "../../types";

type CheckboxProps = {
  status: FilterState;
  setStatus: React.Dispatch<React.SetStateAction<FilterState>>;
  value: Region | "All";
};

export default function Checkbox({ value, status, setStatus }: CheckboxProps) {
  const checked =
    (value === "All" && status.checked.length === 5) ||
    (value !== "All" && status.checked.includes(value));
  return (
    <div className="flex items-center mb-4">
      <input
        id={value}
        type="checkbox"
        checked={checked}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={(e) => {
          if (value !== "All") {
            status.checked.includes(value)
              ? setStatus((s) => ({
                  ...s,
                  checked: s.checked.filter((region) => region !== value),
                }))
              : setStatus((s) => ({ ...s, checked: [...s.checked, value] }));
            return;
          }

          value === "All" && status.checked.length === 5
            ? setStatus((s) => ({ ...s, checked: [] }))
            : setStatus((s) => ({ ...s, checked: [...REGIONS] }));
        }}
      />
      <label
        htmlFor={value}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {value}
      </label>
    </div>
  );
}
