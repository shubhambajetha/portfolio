"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experience = [
    {
        title: "Learning Something New",
        type: "Self-Development",
        date: "NOW",
        description:
            "Continuously exploring emerging technologies, improving my craft, and building projects that turn new ideas into useful experiences.",
    },
    {
        title: "AI Engineer",
        type: "Freelance & Projects",
        date: "2025",
        description:
            "Developing intelligent AI tools and conversational experiences, from early prototypes to practical applications.",
    },
    {
        title: "Full-Stack Developer",
        type: "Web Development",
        date: "2024",
        description:
            "Built responsive web applications across the stack, working with modern frontend interfaces, APIs, and databases.",
    },
];

export function ThirdSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLSpanElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
            const rows = gsap.utils.toArray<HTMLElement>(".experience-row", sectionRef.current);
            const pointY = (row: HTMLElement) => {
                const point = row.querySelector<HTMLElement>(".experience-point");
                if (!point || !glowRef.current) return 0;
                const rowRect = row.getBoundingClientRect();
                const pointRect = point.getBoundingClientRect();
                return row.offsetTop + pointRect.top - rowRect.top + point.offsetHeight / 2 - glowRef.current.offsetHeight / 2;
            };
            const lineProgress = (row: HTMLElement) => {
                if (!lineRef.current || !glowRef.current) return 0;
                const centerY = pointY(row) + glowRef.current.offsetHeight / 2;
                return Math.min(1, Math.max(0, (centerY - lineRef.current.offsetTop) / lineRef.current.offsetHeight));
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
            className="relative mx-auto w-full max-w-7xl overflow-hidden bg-black px-5 py-20 text-white sm:px-8 sm:py-28"
        >
            <div className="pointer-events-none absolute -left-40 top-1/3 size-80 rounded-full bg-purple-700/10 blur-[100px]" />
            <header className="relative mb-16 text-center sm:mb-24">
                <h2 className="mx-auto max-w-3xl font-sans text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-7xl">
                    My career &
                    <span className="block bg-gradient-to-r from-[#e7c7ff] to-[#9b4dff] bg-clip-text text-transparent">
                        experience
                    </span>
                </h2>
            </header>

            <div ref={timelineRef} className="relative mx-auto max-w-6xl">
                <div className="absolute bottom-12 left-1/2 top-0 w-px -translate-x-1/2 bg-white/10" />
                <div
                    ref={lineRef}
                    className="absolute bottom-12 left-1/2 top-0 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-[#e7c7ff] via-[#bc71ff] to-[#9b4dff] shadow-[0_0_14px_2px_rgba(180,83,255,0.6)]"
                />
                <span
                    ref={glowRef}
                    className="absolute left-[calc(50%-8px)] top-0 z-10 size-4 rounded-full bg-[#e5baff] shadow-[0_0_22px_8px_rgba(190,105,255,0.65)]"
                />

                <div className="space-y-14 sm:space-y-24">
                    {experience.map((item) => (
                        <article
                            key={item.title}
                            className="experience-row relative grid grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] sm:gap-5"
                        >
                            <div className="flex flex-col items-start gap-2 pt-1 sm:flex-row sm:justify-between sm:gap-5 sm:pr-3">
                                <div>
                                    <h3 className="font-sans text-xl font-semibold leading-tight text-gray-100 sm:text-3xl">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 font-sans text-sm text-[#c795ff] sm:text-lg">
                                        {item.type}
                                    </p>
                                </div>
                                <span className="shrink-0 pt-0.5 font-sans text-xl font-semibold text-gray-200 sm:text-4xl">
                                    {item.date}
                                </span>
                            </div>

                            <div aria-hidden="true" className="relative z-10 flex justify-center pt-2">
                                <span className="experience-point size-3 rounded-full border border-[#edcaff] bg-[#b94dff] shadow-[0_0_14px_4px_rgba(185,77,255,0.55)]" />
                            </div>

                            <div>
                                <p className="max-w-xl pt-1 font-sans text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
