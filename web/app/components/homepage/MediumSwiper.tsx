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
        <section id="articles" className="pt-3" aria-label="Medium articles">
            <div className="relative">
                <button
                    type="button"
                    onClick={() => moveTrack(-1)}
                    aria-label="Previous articles"
                    className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/75 text-gray-100 shadow-lg backdrop-blur-sm transition hover:bg-white hover:text-black sm:size-14"
                >
                    <ArrowLeft size={17} />
                </button>
                <button
                    type="button"
                    onClick={() => moveTrack(1)}
                    aria-label="Next articles"
                    className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/75 text-gray-100 shadow-lg backdrop-blur-sm transition hover:bg-white hover:text-black sm:size-14"
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
                            className="group relative flex min-h-64 min-w-[88%] snap-start flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#101010] p-4 sm:min-w-[48%] sm:p-5 lg:min-w-[32%]"
                        >
                            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${article.color}`} />
                            <div className="relative">
                                <p className="font-mono text-[10px] tracking-wider text-gray-400">{article.category}</p>
                                <h3 className="mt-7 max-w-xs font-rajdhani text-2xl font-semibold leading-tight sm:text-3xl">
                                    {article.title}
                                </h3>
                                <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-gray-400">
                                    {article.summary}
                                </p>
                            </div>
                            <div className="relative mt-8 flex items-center justify-between border-t border-white/15 pt-4 text-xs text-gray-400">
                                <span>{article.date}</span>
                                <a
                                    href="https://medium.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Read ${article.title} on Medium`}
                                    className="inline-flex items-center gap-1 text-white transition group-hover:text-gray-300"
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
