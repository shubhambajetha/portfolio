"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExperiencePayload } from "@/app/services/experince";


interface experinceprops{
    experincedata:ExperiencePayload[]
}



export function ThirdSection({experincedata}:experinceprops) {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLSpanElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
            const rows = gsap.utils.toArray<HTMLElement>(".experience-row", sectionRef.current);
            const pointY = (row: HTMLElement) => {
                const point = row.querySelector<HTMLElement>(".experience-point");
                const timeline = timelineRef.current;
                if (!point || !glowRef.current || !timeline) return 0;
                const pointRect = point.getBoundingClientRect();
                const timelineRect = timeline.getBoundingClientRect();
                return pointRect.top - timelineRect.top + point.offsetHeight / 2 - glowRef.current.offsetHeight / 2;
            };
            const lineProgress = (row: HTMLElement) => {
                if (!lineRef.current || !glowRef.current || !timelineRef.current) return 0;
                const centerY = pointY(row) + glowRef.current.offsetHeight / 2;
                const lineRect = lineRef.current.getBoundingClientRect();
                const timelineRect = timelineRef.current.getBoundingClientRect();
                const lineTop = lineRect.top - timelineRect.top;
                return Math.min(1, Math.max(0, (centerY - lineTop) / lineRef.current.offsetHeight));
            };

            if (rows.length > 1) {
                gsap.set(glowRef.current, { y: () => pointY(rows[0]) });
                gsap.set(lineRef.current, { scaleY: () => lineProgress(rows[0]) });
                const progress = gsap.timeline({
                    scrollTrigger: {
                        trigger: rows[0],
                        start: "center center",
                        endTrigger: rows[rows.length - 1],
                        end: "center center",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });

                rows.slice(1).forEach((row, index) => {
                    progress.to(glowRef.current, { y: () => pointY(row), duration: 1, ease: "none" }, index);
                    progress.to(lineRef.current, { scaleY: () => lineProgress(row), duration: 1, ease: "none" }, index);
                });
            }

            gsap.utils.toArray<HTMLElement>(".experience-row").forEach((row) => {
                gsap.fromTo(
                    row,
                    { y: 28, opacity: 0.35 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 82%",
                            toggleActions: "play none none reverse",
                        },
                    },
                );
            });
        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="group/section relative isolate mx-auto w-full max-w-7xl overflow-hidden bg-black px-5 py-20 text-white sm:px-8 sm:py-28"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 scale-75 bg-[radial-gradient(ellipse_at_50%_45%,rgba(37,99,235,0.2),rgba(34,211,238,0.1)_38%,transparent_72%)] opacity-0 blur-3xl transition-all duration-700 group-hover/section:scale-100 group-hover/section:opacity-100" />
            <div className="pointer-events-none absolute -left-40 top-1/3 size-80 rounded-full bg-blue-700/10 blur-[100px]" />
            <header className="relative mb-16 text-center sm:mb-24">
                <h2 className="mx-auto max-w-3xl bg-gradient-to-r from-[#60a5fa] via-[#22d3ee] to-[#bfdbfe] bg-clip-text font-sans text-5xl font-medium leading-[0.98] tracking-tight text-transparent sm:text-7xl">
                    My career &
                    <span className="block bg-gradient-to-r from-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">experience</span>
                </h2>
            </header>

            {experincedata.length === 0 ? <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-gray-400">Experience details will appear here soon.</p> : <div ref={timelineRef} className="relative mx-auto max-w-6xl">
                <div className="absolute bottom-12 left-[14px] top-0 w-px -translate-x-1/2 bg-white/10 sm:left-1/2" />
                <div
                    ref={lineRef}
                    className="absolute bottom-12 left-[14px] top-0 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-[#bfdbfe] via-[#22d3ee] to-[#2563eb] shadow-[0_0_14px_2px_rgba(34,211,238,0.45)] sm:left-1/2"
                />
                <span
                    ref={glowRef}
                    className="absolute left-[6px] top-0 z-10 size-4 rounded-full bg-[#bfdbfe] shadow-[0_0_22px_8px_rgba(34,211,238,0.55)] sm:left-[calc(50%-8px)]"
                />

                <div className="space-y-12 sm:space-y-20">
                    {experincedata.map((item, index) => (
                        <article
                            key={`${item.title}-${item.timeDate}-${index}`}
                            className="experience-row relative grid grid-cols-1 items-start gap-3 pl-10 sm:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] sm:gap-5 sm:pl-0"
                        >
                            <span aria-hidden="true" className="experience-point absolute left-[8px] top-2 z-10 size-3 rounded-full border border-[#bfdbfe] bg-[#2563eb] shadow-[0_0_14px_4px_rgba(34,211,238,0.45)] sm:static sm:col-start-2 sm:row-start-1 sm:mx-auto sm:mt-2" />
                            <div className="min-w-0 sm:col-start-1 sm:row-start-1 sm:pr-3 sm:text-right">
                                <h3 className="text-xl font-semibold leading-tight text-gray-100 sm:text-3xl">{item.title}</h3>
                                <p className="mt-2 text-sm text-[#22d3ee] sm:text-lg">{item.subtitle}</p>
                                <span className="mt-3 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 sm:justify-end sm:text-sm">
                                    <span>{item.timeDate}</span><span aria-hidden="true" className="text-cyan-300">to</span><span>{item.endtimedate}</span>
                                </span>
                            </div>
                            <div className="min-w-0 sm:col-start-3 sm:row-start-1">
                                <p className="pt-1 text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>}
        </section>
    );
}
