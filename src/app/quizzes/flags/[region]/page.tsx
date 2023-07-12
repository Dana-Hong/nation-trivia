import Link from "next/link";

import Quiz from "./quiz";
import { Region } from "@/app/types";
import { getAllCountries, getCountriesByRegion } from "@/app/utils";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { region: string } }) {
  const region = params.region;
  const countries = region === "all" ? await getAllCountries() : await getCountriesByRegion(region as Region, true);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] grow flex-col items-center">
      <div className="flex w-full max-w-3xl justify-between gap-2 pt-2 md:pt-4 lg:pt-8">
        <Link href="/quizzes/flags">
          <Button variant={"ghost"}>Back</Button>
        </Link>
        <Button variant={"ghost"}>Quit</Button>
      </div>
      <Quiz data={countries} region={region}/>
    </div>
  );
}
