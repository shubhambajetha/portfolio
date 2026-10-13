import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Appsheel({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="site-shell flex min-h-screen flex-col">
            <Header/>
            <main className="flex-1">{children}</main>
            <Footer/>
        </div>
    )
}
