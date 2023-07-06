import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nation Trivia",
  description:
    "Learn about the different nations around the world and have fun along the way! Learn where countries are, and what their flags look like.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark flex min-h-screen flex-col`}>{children}</body>
    </html>
  );
}
