import Link from "next/link";

export default function Quiz() {
  return (
    <section>
      <div className="flex flex-col gap-2">
        <Link href={"/quizzes/flags"}>Flags</Link>
        <Link href={"/quizzes/capitals"}>Capitals</Link>
      </div>
    </section>
  );
}
