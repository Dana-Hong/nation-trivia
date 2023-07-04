import Link from "next/link";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/app/constants/geography";

export default function Page({}) {
  return (
    <div className="space-y-3 py-2">
      <h1 className="text-center font-medium text-3xl sm:text-4xl">
        Guess the flag!
      </h1>
      <div className="grid sm:grid-cols-2 gap-2 w-[70vw] max-w-lg mx-auto">
        {REGIONS.map((region) => (
          <Link
            key={region}
            href={`/quizzes/flags/${region.toLocaleLowerCase()}`}
          >
            <Button className="w-full capitalize">
              {region.toLocaleLowerCase()}
            </Button>
          </Link>
        ))}
        <Link key={"all"} href={"/quizzes/flags/all"}>
          <Button className="w-full capitalize">All</Button>
        </Link>
      </div>
    </div>
  );
}
