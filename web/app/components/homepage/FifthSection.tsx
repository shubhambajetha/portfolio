"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import Image from "next/image";
import "swiper/css";


const projects = [
    {
        id: 1,
        title: "AI Workspace",
        category: "AI · WEB APP",
        description: "A workspace for turning AI conversations into useful work.",
        stack: ["Next.js", "TypeScript", "AI"],
        image: "/projects/ai-workspace.webp",
        link: "#",
    },
    {
        id: 2,
        title: "Everyday Finance",
        category: "MOBILE · PRODUCT",
        description: "A mobile experience for tracking spending and financial goals.",
        stack: ["React Native", "TypeScript", "Firebase"],
        image: "/projects/everyday-finance.webp",
        link: "#",
    },
    {
        id: 3,
        title: "Studio Portfolio",
        category: "WEB · CREATIVE",
        description: "A modern portfolio with smooth animations and clean design.",
        stack: ["React", "GSAP", "Tailwind CSS"],
        image: "/projects/studio-portfolio.webp",
        link: "#",
    },
];



export default function FifthSection() {
    return (
        <section
            id="projects"
            className="mx-auto max-w-7xl px-5 py-20 text-white sm:px-8"
        >
            <div className="mb-7 flex items-end justify-between">
                <div>
                    <p className="mb-2 text-xs text-purple-400">
                        SELECTED WORK
                    </p>
                    <h2 className="text-3xl font-semibold sm:text-5xl">
                        My Projects.
                    </h2>
                </div>

                <div className="flex gap-2">
                    <button
                        className="project-prev grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-gray-300 transition duration-200 hover:border-purple-400/60 hover:bg-purple-500/15 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400"
                        aria-label="Previous project"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <button
                        className="project-next grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-gray-300 transition duration-200 hover:border-purple-400/60 hover:bg-purple-500/15 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400"
                        aria-label="Next project"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, A11y, Keyboard]}
                navigation={{
                    prevEl: ".project-prev",
                    nextEl: ".project-next",
                }}
                keyboard={{ enabled: true }}
                spaceBetween={12}
                slidesPerView={1.08}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
            >
                {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                            <div className="relative aspect-[16/10]">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 65vw, 50vw"
                                    className="object-cover transition duration-500 hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-4">
                                <p className="mb-1.5 text-xs text-purple-400">
                                    {project.category}
                                </p>

                                <h3 className="text-lg font-semibold">
                                    {project.title}
                                </h3>

                                <p className="mt-1.5 text-xs leading-5 text-neutral-400">
                                    {project.description}
                                </p>

                                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
