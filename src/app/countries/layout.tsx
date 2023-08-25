import Header from "../../components/header";
import Footer from "../../components/footer";

export default function CountriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[calc(100vh-200px)] w-full max-w-screen-2xl grow flex-col items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
