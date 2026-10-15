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
        <section className="relative isolate mx-auto max-w-7xl overflow-hidden bg-black px-4 py-6 text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 animate-pulse bg-[radial-gradient(ellipse_at_55%_45%,rgba(155,77,255,0.11),transparent_65%)] motion-reduce:animate-none"
            />
            <div className="relative z-10 grid grid-cols-2 items-start gap-x-3 mt-8 pt-9 md:gap-x-6">
                <h1 className="whitespace-nowrap font-rajdhani text-[clamp(3.5rem,7vw,8rem)] font-bold leading-[0.9] tracking-[0.01em]">
                    FULL-STACK
                </h1>
                <a
                    href="#projects"
                    className="group mt-2 flex w-fit items-center gap-3 justify-self-end transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                    <span className="rounded-full bg-white px-10 py-3 font-rajdhani font-semibold text-black transition-all duration-300 group-hover:scale-[1.03] group-hover:bg-gray-300">
                        Projects
                    </span>
                    <span className="grid size-12 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight size={22} strokeWidth={1.8} />
                    </span>
                </a>
            </div>

            <div className="relative z-10 mt-4 grid grid-cols-1 items-center gap-x-3 gap-y-5 sm:grid-cols-[0.9fr_1.1fr] md:gap-x-6">
                <p className="mt-4 max-w-md font-rajdhani text-base leading-relaxed text-gray-400">
                    I believe code should be readable before it is logical — because code isn’t
                    written only to make products work, but so people can understand, maintain,
                    and build them.
                </p>
                <h2 className="min-w-0 whitespace-nowrap font-rajdhani text-[clamp(3.5rem,7vw,8rem)] font-bold leading-[0.9] tracking-[0.01em] sm:justify-self-end">
                    DEVEL<span className="relative inline-block">O<span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-share-tech-mono text-[0.12em] font-normal tracking-[-0.1em] text-[#c795ff]">0101</span></span>PER
                </h2>
            </div>

            <div className="relative z-10 mt-8 flex flex-row items-center justify-center py-10">
                <nav aria-label="Social links" className="flex flex-wrap items-center justify-center gap-8 px-4">
                    {links.map(({ name, Icon, url }) => (
                        <a
                            key={name}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-gray-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-[#c795ff]/70 hover:bg-[#9b4dff]/20 hover:text-white hover:shadow-[0_8px_24px_rgba(155,77,255,0.3)]"
                        >
                            <Icon aria-hidden="true" className="text-base transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
                            <span className="transition-transform duration-300 group-hover:translate-x-0.5">{name}</span>
                        </a>
                    ))}
                </nav>
            </div>

            <div>
                <MediumSwiper />
            </div>
        </section>
    );
}
