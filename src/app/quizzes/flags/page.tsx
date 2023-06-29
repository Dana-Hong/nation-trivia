import Link from "next/link";
import { REGIONS } from "@/app/constants/geography";

export default function Page({}) {
  return (
    <div>
      <h1>Guess the flag!</h1>
      <div className="flex flex-col gap-2">
        {REGIONS.map((region) => (
          <Link
            className="capitalize"
            href={`/quizzes/flags/${region.toLocaleLowerCase()}`}
          >
            {region.toLocaleLowerCase()}
          </Link>
        ))}
        <p>All</p>
      </div>
    </div>
  );
}
