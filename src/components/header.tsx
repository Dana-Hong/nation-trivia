"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <header className="flex justify-between items-center py-1 px-2 border-b relative">
      <Link href={"/"}>
        <Button className="w-full">NT</Button>
      </Link>
      <button className="sm:hidden" onClick={handleClick}>
        menu
      </button>
      <nav className="hidden sm:flex gap-4">
        <Button variant="link">
          <Link href={"/about"}>About</Link>
        </Button>
        <Button variant="link">
          <Link href={"/countries"}>Countries Database</Link>
        </Button>
        <Button variant="link">
          <Link href={"/scores"}>Scores</Link>
        </Button>
      </nav>
      <nav className={`${!open ? "-translate-x-full" : "-translate-x-0"} flex transition-transform top-0 left-0 w-full h-screen absolute`}>
        <div className="flex flex-col pt-8 px-8 gap-2 bg-zinc-900 h-full w-3/4 max-w-lg">
          <Link
            href={"/"}
            className="font-medium text-xl text-zinc-200 py-2 border-b"
            onClick={handleClick}
          >
            Home
          </Link>
          <Link
            href={"/about"}
            className="font-medium text-base text-zinc-200"
            onClick={handleClick}
          >
            About
          </Link>
          <Link href={"/countries"} className="text-base text-zinc-200" onClick={handleClick}>
            Countries Database
          </Link>
          <Link href={"/scores"} className="text-base text-zinc-200">
            Scores
          </Link>
        </div>
        <div className={`grow ${!open ? 'bg-transparent' : 'bg-zinc-800 bg-opacity-80'} delay-100 transition-colors`} onClick={handleClick}></div>
      </nav>
    </header>
  );
}
