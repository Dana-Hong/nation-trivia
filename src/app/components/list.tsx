import { Country } from "../types";

type ListProps = {
  countries: Country[];
};

export default function List({ countries }: ListProps) {
  const countriesList = countries.map((country) => (
    <li key={country.name.common}>{country.name.common}</li>
  ));

  return (
    <div>
      <p>Country List</p>
      <ul>{countriesList}</ul>
    </div>
  );
}
