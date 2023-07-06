import Link from "next/link";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/app/constants/geography";

export default function Page({}) {
  return (
    <section className="rg-green-200 flex grow flex-col items-center gap-3 py-2">
      <h1 className="pt-12 text-center text-3xl font-medium underline underline-offset-4 sm:text-4xl">
        Capital Cities
      </h1>
      <div className="rg-green-300 mx-auto grid w-full max-w-xl gap-2 pt-8 sm:grid-cols-2 sm:gap-6">
        {REGIONS.map((region) => (
          <div
            key={region}
            className="rounded-md border py-3 cursor-pointer transition-colors hover:bg-zinc-900 sm:py-10"
          >
            <Link
              className="mx-auto inline-block h-full w-full text-center capitalize sm:text-2xl sm:font-semibold"
              href={`/quizzes/capitals/${region.toLocaleLowerCase()}`}
            >
              {region.toLocaleLowerCase()}
            </Link>
          </div>
        ))}
        <div
          key={"all"}
          className="rounded-md border py-3 cursor-pointer transition-colors hover:bg-zinc-900 sm:py-10"
        >
          <Link
            className="mx-auto inline-block h-full w-full text-center capitalize sm:text-2xl sm:font-semibold"
            href="/quizzes/capitals/all"
          >
            All
          </Link>
        </div>
      </div>
      <Link href={"/quizzes"} className="mt-12">
        <Button variant={"secondary"}>Back to Quizzes</Button>
      </Link>
    </section>
  );
}
