import { ArrowRight } from "lucide-react";

export default function SevenSection() {
    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="group/section relative isolate mx-auto w-[calc(100%-2.25rem)] max-w-7xl py-12 text-white sm:w-[calc(100%-4rem)] sm:py-20"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 scale-50 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22),rgba(34,211,238,0.12)_38%,transparent_72%)] opacity-0 blur-3xl transition-all duration-700 group-hover/section:scale-100 group-hover/section:opacity-100" />
            <header className="mb-8 sm:mb-10">
                <p className="mb-2 font-[var(--font-share-tech-mono)] text-xs uppercase tracking-[0.18em] text-[#22d3ee] transition-colors duration-500 group-hover/section:text-[#93c5fd] sm:text-sm">
                    Let&apos;s turn your next idea
                </p>
                <h2 className="bg-gradient-to-r from-[#60a5fa] via-[#22d3ee] to-[#bfdbfe] bg-clip-text font-rajdhani text-3xl font-semibold tracking-tight text-transparent sm:text-5xl">
                    Ready to Connect
                </h2>
            </header>
            <div className="group relative isolate flex min-h-[560px] flex-col items-center justify-center overflow-hidden rounded-[22px] border border-white/10 bg-[#080708] px-5 py-16 text-center transition-colors duration-500 hover:border-[#60a5fa]/40 sm:min-h-[640px] sm:px-10">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_8%,rgba(37,99,235,0.16),transparent_42%),radial-gradient(ellipse_at_85%_100%,rgba(34,211,238,0.09),transparent_38%)] transition-opacity duration-500 group-hover:opacity-0"
                />
                <div aria-hidden="true" className="pointer-events-none absolute -z-10 left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.32),rgba(34,211,238,0.16)_45%,transparent_72%)] opacity-0 blur-2xl transition-all duration-700 ease-out group-hover:scale-[8] group-hover:opacity-100" />
                <div aria-hidden="true" className="pointer-events-none absolute left-[14%] top-[22%] size-2 rounded-full bg-[#60a5fa]/40 blur-[2px]" />
                <div aria-hidden="true" className="pointer-events-none absolute right-[19%] top-[58%] size-1.5 rounded-full bg-[#22d3ee]/40 blur-[2px]" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-[22%] left-[10%] size-1 rounded-full bg-[#60a5fa]/50 blur-[1px]" />

                <h2
                    id="contact-title"
                    className="font-[var(--font-share-tech-mono)] text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.06em]"
                >
                    FROM IDEA TO <span className="bg-gradient-to-r from-[#3b82f6] via-[#22d3ee] to-[#bfdbfe] bg-clip-text text-transparent">IMPACT</span>
                </h2>
                <p className="mt-5 font-[var(--font-share-tech-mono)] text-sm font-semibold uppercase tracking-wide text-[#7dd3fc] sm:text-xl">
                    Let&apos;s build something real.
                </p>

                <a
                    href="mailto:"
                    className="group mt-10 inline-flex min-h-[72px] items-center gap-5 rounded-full border border-white/15 px-9 font-[var(--font-share-tech-mono)] text-base font-semibold text-gray-100 transition-all duration-300 hover:border-[#22d3ee]/60 hover:bg-[#2563eb]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080708]"
                >
                    Get in Touch
                    <ArrowRight aria-hidden="true" className="size-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#22d3ee]" />
                </a>

                <p className="mt-7 text-sm text-gray-500 sm:text-base">
                    Open to full-time roles &amp; freelance projects
                </p>
                <p className="mt-7 max-w-2xl font-rajdhani text-lg font-medium leading-relaxed text-gray-300 sm:text-2xl">
                    I build high-performance applications that turn complex ideas into seamless user experiences.
                </p>
            </div>
        </section>
    );
}
