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
    return (
        <section className="max-w-7xl mx-auto px-4 py-6 bg-black text-white">
            <div className="grid grid-cols-2 items-start gap-x-3 md:gap-x-6 mt-8 pt-9">
                <h1 className="whitespace-nowrap font-rajdhani text-[clamp(3.5rem,7vw,8rem)] font-bold leading-[0.9] tracking-[0.01em]">
                    FULL-STACK
                </h1>
                <a
                    href="#projects"
                    className="group mt-2 flex w-fit items-center gap-3 justify-self-end"
                >
                    <span className="rounded-full bg-white px-10 py-3 font-rajdhani font-semibold text-black transition-colors group-hover:bg-gray-300">
                        Projects
                    </span>
                    <span className="grid size-12 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight size={22} strokeWidth={1.8} />
                    </span>
                </a>
            </div>

            <div className="grid grid-cols-2 items-center gap-x-3 md:gap-x-6 mt-4">
                <p className="mt-4 max-w-md font-rajdhani text-base leading-relaxed text-gray-400">
                    I believe code should be readable before it is logical — because code isn’t
                    written only to make products work, but so people can understand, maintain,
                    and build them.
                </p>
                <h2 className="whitespace-nowrap font-rajdhani text-[clamp(3.5rem,7vw,8rem)] font-bold leading-[0.9] tracking-[0.01em]">
                    DEVELOPER
                </h2>
            </div>

            <div className="mt-8 py-10 flex flex-row items-center justify-center">
                <nav aria-label="Social links" className="flex flex-wrap items-center justify-center gap-8 px-4">
                    {links.map(({ name, Icon, url }) => (
                        <a
                            key={name}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white"
                        >
                            <Icon aria-hidden="true" className="text-base" />
                            <span>{name}</span>
                        </a>
                    ))}
                </nav>
            </div>

            <MediumSwiper />
        </section>
    );
}
