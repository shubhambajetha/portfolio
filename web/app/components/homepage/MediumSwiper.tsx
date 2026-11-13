"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const articles = [
    {
        category: "FRONTEND · 6 MIN READ",
        title: "Building Interfaces That Feel Effortless",
        summary: "Small decisions in layout, motion, and feedback can make a product feel clear and natural.",
        color: "from-cyan-300/25 via-blue-500/10 to-transparent",
        date: "May 18, 2025",
    },
    {
        category: "ENGINEERING · 8 MIN READ",
        title: "Readable Code Is a Team Feature",
        summary: "A few practical habits for making code easier to review, maintain, and improve together.",
        color: "from-fuchsia-300/25 via-violet-500/10 to-transparent",
        date: "April 02, 2025",
    },
    {
        category: "WORKFLOW · 5 MIN READ",
        title: "A Better Way to Start Side Projects",
        summary: "Keep the first version small, learn from real use, and let the next step earn its place.",
        color: "from-amber-200/25 via-orange-500/10 to-transparent",
        date: "February 11, 2025",
    },
];

export function MediumSwiper() {
    const trackRef = useRef<HTMLDivElement>(null);

    function moveTrack(direction: -1 | 1) {
        const track = trackRef.current;
        if (track) track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: "smooth" });
    }

    return (
        <section id="articles" aria-labelledby="articles-heading" className="group/section relative isolate mx-auto w-[calc(100%-2.25rem)] max-w-7xl scroll-mt-24 overflow-hidden py-16 text-white sm:w-[calc(100%-4rem)] sm:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/4 -z-10 size-80 rounded-full bg-cyan-500/[0.08] blur-[100px]" />
            <header className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
                <div>
                    <p className="mb-2 font-[var(--font-share-tech-mono)] text-xs uppercase tracking-[0.18em] text-[#22d3ee]">Ideas & notes</p>
                    <h2 id="articles-heading" className="bg-gradient-to-r from-[#60a5fa] to-[#22d3ee] bg-clip-text font-[var(--font-rajdhani)] text-5xl font-semibold leading-none tracking-tight text-transparent sm:text-7xl">Latest writing.</h2>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">Thoughts on building thoughtful products, better interfaces, and reliable software.</p>
                </div>
                {articles.length > 1 && <div className="hidden gap-2 sm:flex">
                    <button type="button" onClick={() => moveTrack(-1)} aria-label="Previous articles" className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-gray-300 transition hover:border-cyan-400/60 hover:bg-blue-500/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"><ArrowLeft size={17} /></button>
                    <button type="button" onClick={() => moveTrack(1)} aria-label="Next articles" className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-gray-300 transition hover:border-cyan-400/60 hover:bg-blue-500/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"><ArrowRight size={17} /></button>
                </div>}
            </header>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => moveTrack(-1)}
                    aria-label="Previous articles"
                    className="absolute left-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/75 text-gray-100 shadow-lg backdrop-blur-sm transition hover:border-cyan-300/50 hover:bg-cyan-950 sm:hidden"
                >
                    <ArrowLeft size={17} />
                </button>
                <button
                    type="button"
                    onClick={() => moveTrack(1)}
                    aria-label="Next articles"
                    className="absolute right-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/75 text-gray-100 shadow-lg backdrop-blur-sm transition hover:border-cyan-300/50 hover:bg-cyan-950 sm:hidden"
                >
                    <ArrowRight size={17} />
                </button>

                <div
                    ref={trackRef}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {articles.map((article) => (
                        <article
                            key={article.title}
                            className="group relative flex min-h-[19rem] min-w-[88%] snap-start flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#080b12] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_20px_60px_rgba(8,145,178,0.12)] sm:min-w-[48%] sm:p-6 lg:min-w-[32%]"
                        >
                            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${article.color}`} />
                            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full border border-white/[0.06] transition duration-500 group-hover:scale-110 group-hover:border-white/10" />
                            <div className="relative">
                                <p className="inline-flex rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-[10px] tracking-wider text-gray-300">{article.category}</p>
                                <h3 className="mt-6 max-w-xs font-rajdhani text-2xl font-semibold leading-tight text-white sm:text-3xl">
                                    {article.title}
                                </h3>
                                <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-gray-300/75">
                                    {article.summary}
                                </p>
                            </div>
                            <div className="relative mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-gray-400">
                                <time>{article.date}</time>
                                <a
                                    href="https://medium.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Read ${article.title} on Medium`}
                                    className="inline-flex items-center gap-1 font-medium text-cyan-200 transition hover:text-white"
                                >
                                    Read article <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
