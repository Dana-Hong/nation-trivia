import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-1 px-2 border-b">
        <Link href={"/"}>
      <Button className="w-full">
          NT
      </Button>
        </Link>
      <button className="sm:hidden">menu</button>
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
    </header>
  );
}
