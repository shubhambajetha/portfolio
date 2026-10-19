"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ArrowRight } from "lucide-react";
import {
    SiGithub,
    SiInstagram,
    SiLeetcode,
    SiMedium,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MediumSwiper } from "./MediumSwiper";

const links = [
    { name: "GitHub", Icon: SiGithub, url: "https://github.com/your-username" },
    { name: "LinkedIn", Icon: FaLinkedin, url: "https://linkedin.com/in/your-username" },
    { name: "Medium", Icon: SiMedium, url: "https://medium.com/@your-username" },
    { name: "LeetCode", Icon: SiLeetcode, url: "https://leetcode.com/u/your-username/" },
    { name: "Instagram", Icon: SiInstagram, url: "https://instagram.com/your-username" },
];

export function FirstSection() {
    useEffect(() => {
        const lenis = new Lenis({ autoRaf: true, anchors: true, duration: 1.2 });
        return () => lenis.destroy();
    }, []);

    return (
        <section className="group/section relative isolate mx-auto flex max-w-7xl flex-col overflow-hidden bg-black px-4 py-6 text-white">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 scale-75 bg-[radial-gradient(ellipse_at_50%_45%,rgba(37,99,235,0.2),rgba(34,211,238,0.1)_38%,transparent_72%)] opacity-0 blur-3xl transition-all duration-700 group-hover/section:scale-100 group-hover/section:opacity-100" />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 animate-pulse bg-[radial-gradient(ellipse_at_55%_45%,rgba(37,99,235,0.11),transparent_65%)] motion-reduce:animate-none"
            />
            <div className="contents md:relative md:z-10 md:mt-8 md:grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] md:items-start md:gap-x-6 md:pt-9">
                <h1 className="relative z-10 order-1 whitespace-nowrap bg-gradient-to-r from-[#60a5fa] via-[#22d3ee] to-[#bfdbfe] bg-clip-text font-rajdhani text-[clamp(2rem,9vw,3.25rem)] font-bold leading-[0.9] tracking-[0.01em] text-transparent md:order-none md:col-span-1 md:text-[clamp(3rem,6vw,7rem)]">
                    FULL-STACK
                </h1>
                <a
                    href="#projects"
                    className="group relative z-10 order-3 mt-5 flex w-fit items-center gap-3 justify-self-start transition-transform duration-300 ease-out hover:-translate-y-1 md:order-none md:col-span-1 md:mt-2 md:justify-self-end"
                >
                    <span className="rounded-full bg-white px-10 py-3 font-rajdhani font-semibold text-black transition-all duration-300 group-hover:scale-[1.03] group-hover:bg-gray-300">
                        Projects
                    </span>
                    <span className="grid size-12 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight size={22} strokeWidth={1.8} />
                    </span>
                </a>
            </div>

            <div className="contents md:relative md:z-10 md:mt-4 md:grid md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-x-6 md:gap-y-5">
                <p className="relative z-10 order-4 mt-5 max-w-md font-rajdhani text-base leading-relaxed text-gray-400 md:order-none md:mt-4">
                    I believe code should be readable before it is logical — because code isn’t
                    written only to make products work, but so people can understand, maintain,
                    and build them.
                </p>
                <h2 className="relative z-10 order-2 min-w-0 whitespace-nowrap bg-gradient-to-r from-[#60a5fa] via-[#22d3ee] to-[#bfdbfe] bg-clip-text font-rajdhani text-[clamp(2.4rem,10vw,3.75rem)] font-bold leading-[0.9] tracking-[0.01em] text-transparent md:order-none md:mt-0 md:justify-self-end md:text-[clamp(3rem,7vw,6rem)] lg:text-[clamp(3.5rem,7vw,8rem)]">
                    DEVEL<span className="relative inline-block">O<span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-share-tech-mono text-[0.16em] font-normal tracking-[-0.06em] text-[#22d3ee] md:text-[0.12em]">0101</span></span>PER
                </h2>
            </div>

            <div className="relative z-10 order-5 mt-8 flex flex-row items-center justify-center py-10 md:order-none">
                <nav aria-label="Social links" className="flex flex-wrap items-center justify-center gap-3 px-2 sm:gap-5 sm:px-4 lg:gap-8">
                    {links.map(({ name, Icon, url }) => (
                        <a
                            key={name}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-gray-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-[#22d3ee]/70 hover:bg-[#2563eb]/20 hover:text-white hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)]"
                        >
                            <Icon aria-hidden="true" className="text-base transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
                            <span className="transition-transform duration-300 group-hover:translate-x-0.5">{name}</span>
                        </a>
                    ))}
                </nav>
            </div>

            <div className="relative z-10 order-6 md:order-none">
                <MediumSwiper />
            </div>
        </section>
    );
}
