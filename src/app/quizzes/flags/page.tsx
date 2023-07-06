import Link from "next/link";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/app/constants/geography";

export default function Page({}) {
  return (
    <section className="flex grow flex-col items-center gap-3 py-2">
      <h1 className="pt-32 text-center text-3xl font-medium sm:text-4xl">Guess the flag</h1>
      <div className="mx-auto grid w-[70vw] max-w-lg gap-2 pt-8 sm:grid-cols-2">
        {REGIONS.map((region) => (
          <Link key={region} href={`/quizzes/flags/${region.toLocaleLowerCase()}`}>
            <Button className="w-full capitalize">{region.toLocaleLowerCase()}</Button>
          </Link>
        ))}
        <Link key={"all"} href={"/quizzes/flags/all"}>
          <Button className="w-full capitalize">All</Button>
        </Link>
      </div>
      <Link href={"/quizzes"} className="mt-12">
        <Button variant={"secondary"}>Back to Quizzes</Button>
      </Link>
    </section>
  );
}
