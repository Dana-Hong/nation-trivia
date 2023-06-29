import Link from "next/link";
import { Button } from "@/components/ui/button";
import FlagIcon from "@/components/icons/flag-fill";

export default function Quiz() {
  return (
    <section className="flex flex-col justify-center grow w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col justify-center bg-red-600 gap-2 max-w-[70vw] mx-auto">
        <Link href={"/quizzes/flags"}>
          <Button className="w-full">
            <FlagIcon className="mr-2 h-4 w-4 fill-green-600" />
            Flags
          </Button>
        </Link>
        <Link href={"/quizzes/capitals"}>
          <Button className="w-full">Capitals</Button>
        </Link>
      </div>
    </section>
  );
}
