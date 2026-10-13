import Link from "next/link";

export default function Header() {
    return (
        <header className="site-header">
            <Link href="/" className="brand" aria-label="Your Name, home">
                Shubham<span>Portfolio / 2026</span>
            </Link>
            <nav className="nav-links" aria-label="Main navigation">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#articles">Articles</a>
                <a href="#contact">Contact</a>
            </nav>
            <a className="header-note" href="#contact">Available for work ↗</a>
        </header>
    );
}
