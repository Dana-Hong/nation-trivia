import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-1 px-2">
      <Link className="bg-neutral-800 blue-500 rounded-md py-1 px-3 inline-block" href={"/"}>
        NT
      </Link>
      <button className="sm:hidden">menu</button>
      <nav className="hidden sm:flex gap-4">
        <Link href={"/about"}>About</Link>
        <Link href={"/countries"}>Countries Database</Link>
        <Link href={"/scores"}>Scores</Link>
      </nav>
    </header>
  );
}
