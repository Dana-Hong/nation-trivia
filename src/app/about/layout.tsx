import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout({ children } : { children: React.ReactNode}) {
    return (
        <>
        <Header />
        <main className="grow">{children}</main>
        <Footer />
        </>
    )
}