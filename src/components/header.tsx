"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import BurgerMenu from "./icons/burger-menu";
import EarthNoBG from "../../public/globe-2-nobg.png";
import Close from "./icons/close";

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <header className="relative z-50 flex items-center justify-between border-b px-2 py-1">
      <div className="mx-auto flex w-full max-w-screen-2xl justify-between">
        <Button asChild variant={"link"} className="gap-2">
          <Link href={"/"}>
            <Image src={EarthNoBG} height={25} width={25} alt="Earth logo" />
            <span className="text-base font-bold">Nation Trivia</span>
          </Link>
        </Button>
        <Button variant="ghost" className="sm:hidden" size="icon" onClick={handleClick}>
          <BurgerMenu className="h-5 w-5" />
        </Button>
        <nav className="hidden gap-4 sm:flex">
          <ul>
            <Link href={"/countries"}>
              <Button variant="link">Explore Countries</Button>
            </Link>
            <Link href={"/quizzes"}>
              <Button variant="link">Quizzes</Button>
            </Link>
          </ul>
        </nav>
      </div>
      <nav
        className={`${
          !open ? "-translate-x-full" : "-translate-x-0"
        } absolute left-0 top-0 flex h-screen w-full transition-transform`}
      >
        <div className="flex h-full w-3/4 max-w-lg flex-col gap-2 bg-zinc-950 px-8 pt-8">
          <div className="flex justify-between border-b">
            <Button asChild variant="link" className="gap-2 px-0 min-[380px]:px-4">
              <Link href={"/"} className="flex items-center gap-2 py-2">
                <Image src={EarthNoBG} height={25} width={25} alt="Earth logo" />
                <span className="block text-base font-semibold text-zinc-200">Nation Trivia</span>
              </Link>
            </Button>
            <Button onClick={handleClick} variant="ghost" size="icon">
              <Close className="h-5 w-5 fill-zinc-200" />
            </Button>
          </div>
          <Link href={"/countries"} className="text-base text-zinc-200" onClick={handleClick}>
            Explore Countries
          </Link>
          <Link href={"/quizzes"} className="text-base text-zinc-200" onClick={handleClick}>
            Quizzes
          </Link>
        </div>
        <div
          className={`grow ${
            !open ? "bg-transparent" : "bg-zinc-900 bg-opacity-90"
          } transition-colors delay-100`}
          onClick={handleClick}
        ></div>
      </nav>
    </header>
  );
}
