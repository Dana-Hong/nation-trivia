import Link from "next/link";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col">
      <nav className="flex justify-between items-center">
        {" "}
        <Link
          className="bg-neutral-800 text-blue-500 border rounded-md py-2 px-3 inline-block"
          href={"/"}
        >
          Home
        </Link>
        <ul className="flex gap-4">
          <li>Countries List</li>
          <li>Scores</li>
        </ul>
      </nav>
      <main className="flex flex-col grow">{children}</main>
      <footer className="flex justify-center py-4 bg-blue-900">
        <p>Copyright Dana Hong</p>
      </footer>
    </section>
  );
}