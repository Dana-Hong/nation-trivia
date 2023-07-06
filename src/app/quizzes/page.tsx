import Link from "next/link";
import FlagsBG from "./flagsbg";
import CapitalsBG from "./capitalsbg";

export default function Quiz() {
  return (
    <section className="mx-auto flex w-full rax-w-[1400px] grow">
      <div className="mx-auto flex w-full rax-w-7xl grow flex-col md:flex-row md:ry-8 lg:ry-13">
        <div className="relative flex grow basis-1/2 items-center justify-center cursor-pointer">
          <FlagsBG />
          <Link href={"/quizzes/flags"} className="z-10 text-4xl bg-zinc-950 bg-opacity-70 hover:backdrop-blur-md lg:hover:text-7xl transition-all h-full w-full flex items-center justify-center md:text-5xl lg:text-6xl">
            <h2 className="font-semibold ">Flags</h2>
          </Link>
        </div>
        <div className="relative flex grow basis-1/2 items-center justify-center cursor-pointer">
          <CapitalsBG />
          <Link href={"/quizzes/capitals"} className="z-10 text-4xl bg-zinc-950 bg-opacity-70 hover:backdrop-blur-md lg:hover:text-7xl transition-all h-full w-full flex items-center justify-center md:text-5xl lg:text-6xl">
            <h2 className="font-semibold ">Capitals</h2>
          </Link>
        </div>
      </div>
    </section>
  );
}
