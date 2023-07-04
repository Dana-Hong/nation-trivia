import Header from "../../components/header";
import Footer from "../../components/footer";

export default function CountriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col grow">{children}</main>
      <Footer />
    </>
  );
}
