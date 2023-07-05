"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BurgerMenu from "./icons/burger-menu";
import Link from "next/link";

import EarthLogo from "./icons/earth-logo";
import Close from "./icons/close";

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <header className="relative z-50 flex items-center justify-between border-b px-2 py-1">
      <Link href={"/"} className="inline-flex gap-2">
        <EarthLogo className="h-6 w-6" />
        <span className="font-bold">Nation Trivia</span>
      </Link>
      <button className="sm:hidden" onClick={handleClick}>
        <BurgerMenu className="h-6 w-6" />
      </button>
      <nav className="hidden gap-4 sm:flex">
        <Button variant="link">
          <Link href={"/about"}>About</Link>
        </Button>
        <Button variant="link">
          <Link href={"/countries"}>Countries Database</Link>
        </Button>
        <Button variant="link">
          <Link href={"/quizzes"}>Quizzes</Link>
        </Button>
        <Button variant="link">
          <Link href={"/scores"}>Scores</Link>
        </Button>
      </nav>
      <nav
        className={`${
          !open ? "-translate-x-full" : "-translate-x-0"
        } absolute left-0 top-0 flex h-screen w-full transition-transform`}
      >
        <div className="flex h-full w-3/4 max-w-lg flex-col gap-2 bg-zinc-900 px-8 pt-8">
          <div className="flex justify-between border-b">
            <Link
              href={"/"}
              className="py-2 text-xl font-medium text-zinc-200"
              onClick={handleClick}
            >
              Home
            </Link>
            <div onClick={handleClick}>
              <Close className="-mr-2 -mt-3 h-7 w-7 fill-zinc-200" />
            </div>
          </div>
          <Link
            href={"/about"}
            className="text-base font-medium text-zinc-200"
            onClick={handleClick}
          >
            About
          </Link>
          <Link href={"/countries"} className="text-base text-zinc-200" onClick={handleClick}>
            Countries Database
          </Link>
          <Link href={"/quizzes"} className="text-base text-zinc-200" onClick={handleClick}>
            Quizzes
          </Link>
          <Link href={"/scores"} className="text-base text-zinc-200">
            Scores
          </Link>
        </div>
        <div
          className={`grow ${
            !open ? "bg-transparent" : "bg-zinc-800 bg-opacity-90"
          } transition-colors delay-100`}
          onClick={handleClick}
        ></div>
      </nav>
    </header>
  );
}
