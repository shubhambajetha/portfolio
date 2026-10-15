import Link from "next/link";

export default function Header() {
    return (
        <header className="mx-auto grid h-[72px] w-[calc(100%-4rem)] max-w-[1440px] grid-cols-[1fr_2fr_1fr] items-center border-b border-white/[0.14] max-md:w-[calc(100%-2.25rem)] max-md:grid-cols-[1fr_auto]">
            <Link href="/" className="font-[var(--font-share-tech-mono)] text-base leading-[1.1] tracking-[-0.04em] max-[420px]:text-sm" aria-label="Your Name, home">
                Shubham<span className="block text-[#93918f]">Portfolio / 2026</span>
            </Link>
            <nav className="flex justify-center gap-[clamp(22px,4vw,62px)] text-[13px] text-[#b3b1ae] max-md:justify-end max-md:gap-[18px] max-md:text-[11px] max-[420px]:gap-[13px] max-[420px]:text-[10px]" aria-label="Main navigation">
                <a className="transition-colors duration-200 hover:text-white" href="#about">About</a>
                <a className="transition-colors duration-200 hover:text-white" href="#projects">Projects</a>
                <a className="transition-colors duration-200 hover:text-white" href="#articles">Articles</a>
                <a className="transition-colors duration-200 hover:text-white" href="#contact">Contact</a>
            </nav>
            <a className="justify-self-end text-xs uppercase tracking-[0.08em] text-[#aaa8a5] transition-colors duration-200 hover:text-white max-md:hidden" href="#contact">Available for work ↗</a>
        </header>
    );
}

