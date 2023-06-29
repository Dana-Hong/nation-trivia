import { Country } from "@/app/types";

export default function Quiz({ country }: { country: Country }) {
  return <div>{country.name.common}</div>;
}
