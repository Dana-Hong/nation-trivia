import Link from "next/link";

import Header from "../components/header";
import Footer from "../components/footer";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-col grow mx-auto w-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
