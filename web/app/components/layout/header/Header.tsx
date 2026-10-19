import Link from "next/link";

const navigation = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Articles", href: "#articles" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    return (
        <header className="sticky top-0 z-50 mx-auto grid min-h-[76px] w-[calc(100%-2.25rem)] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-white/[0.12] bg-black/75 shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-colors duration-300 sm:min-h-[84px] sm:w-[calc(100%-4rem)] sm:gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Link
                href="/"
                className="w-fit rounded-sm font-[var(--font-share-tech-mono)] text-sm leading-[1.15] tracking-[-0.04em] outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] sm:text-base"
                aria-label="Shubham, home"
            >
                Shubham
                <span className="block text-[#93918f]">Portfolio / 2026</span>
            </Link>

            <nav
                aria-label="Main navigation"
                className="flex min-w-0 items-center justify-between gap-0.5 rounded-full border border-white/[0.16] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-1 text-[10px] text-[#b3b1ae] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_18px_rgba(34,211,238,0.04)] backdrop-blur-md sm:gap-1 sm:p-1.5 sm:text-xs md:justify-center md:gap-2 md:px-2"
            >
                {navigation.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        className="rounded-full px-2 py-2 text-center transition-colors duration-200 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#22d3ee] sm:px-3 md:px-4 md:py-2.5"
                    >
                        {label}
                    </a>
                ))}
            </nav>

            <a
                className="hidden justify-self-end rounded-full border border-white/[0.14] px-4 py-2 font-[var(--font-share-tech-mono)] text-[11px] uppercase tracking-[0.08em] text-[#aaa8a5] transition-colors duration-200 hover:border-[#22d3ee]/50 hover:text-[#22d3ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] lg:inline-flex"
                href="#contact"
            >
                Available for work <span aria-hidden="true" className="ml-2">↗</span>
            </a>
        </header>
    );
}
