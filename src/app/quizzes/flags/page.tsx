import Link from "next/link";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/app/constants/geography";

export default function Page({}) {
  return (
    <div>
      <h1 className="text-center">Guess the flag!</h1>
      <div className="flex flex-col gap-2 max-w-[70vw] mx-auto">
        {REGIONS.map((region) => (
          <Link
            key={region}
            href={`/quizzes/flags/${region.toLocaleLowerCase()}`}
          >
            <Button variant="link" className="w-full capitalize">{region.toLocaleLowerCase()}</Button>
          </Link>
        ))}
        <Link key={"all"} href={'/quizzes/flags/all'}>
        <Button variant="link" className="w-full capitalize">

        All
        </Button>
        </Link>
      </div>
    </div>
  );
}
