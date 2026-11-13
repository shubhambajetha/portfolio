"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    SiBootstrap,
    SiCss,
    SiDocker,
    SiExpress,
    SiFirebase,
    SiGit,
    SiGsap,
    SiGithub,
    SiHtml5,
    SiJavascript,
    SiLaravel,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPostman,
    SiPrisma,
    SiPhp,
    SiPython,
    SiReact,
    SiRedux,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import type { IconType } from "react-icons";

const skillGroups: { title: string; skills: { name: string; Icon: IconType; color: string }[] }[] = [
    { title: "Languages", skills: [
        { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
        { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
        { name: "Python", Icon: SiPython, color: "#4b9bd5" },
        { name: "PHP", Icon: SiPhp, color: "#8993be" },
        { name: "SQL", Icon: SiMysql, color: "#4b9bd5" },
    ] },
    { title: "Frontend", skills: [
        { name: "React", Icon: SiReact, color: "#61dafb" },
        { name: "Next.js", Icon: SiNextdotjs, color: "#f5f5f5" },
        { name: "React Native", Icon: SiReact, color: "#61dafb" },
        { name: "HTML5", Icon: SiHtml5, color: "#e96328" },
        { name: "CSS3", Icon: SiCss, color: "#42a5f5" },
        { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
        { name: "Redux", Icon: SiRedux, color: "#a970ff" },
        { name: "GSAP", Icon: SiGsap, color: "#88ce02" },
        { name: "Bootstrap", Icon: SiBootstrap, color: "#7952b3" },
    ] },
    { title: "Backend & APIs", skills: [
        { name: "Node.js", Icon: SiNodedotjs, color: "#68a063" },
        { name: "Express.js", Icon: SiExpress, color: "#d1d5db" },
        { name: "Laravel", Icon: SiLaravel, color: "#ff2d20" },
        { name: "Prisma ORM", Icon: SiPrisma, color: "#8c9eff" },
    ] },
    { title: "Databases", skills: [
        { name: "MySQL", Icon: SiMysql, color: "#4b9bd5" },
        { name: "PostgreSQL", Icon: SiPostgresql, color: "#699eca" },
        { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
        { name: "Firebase", Icon: SiFirebase, color: "#ffca28" },
    ] },
    { title: "Tools & Cloud", skills: [
        { name: "Git", Icon: SiGit, color: "#f05032" },
        { name: "GitHub", Icon: SiGithub, color: "#d1d5db" },
        { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
        { name: "Docker", Icon: SiDocker, color: "#2496ed" },
        { name: "AWS", Icon: FaAws, color: "#ff9900" },
    ] },
];

export function FourthSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
            gsap.fromTo(
                ".skills-heading",
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
                },
            );
            gsap.fromTo(
                ".skill-card",
                { y: 28, opacity: 0, scale: 0.97 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.65,
                    stagger: { each: 0.055, from: "start" },
                    ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 76%", once: true },
                },
            );
        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} id="skills" aria-labelledby="skills-title" className="group/section relative isolate mx-auto w-[calc(100%-2.25rem)] max-w-7xl overflow-hidden py-16 text-white sm:w-[calc(100%-4rem)] sm:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 scale-75 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2),rgba(34,211,238,0.1)_38%,transparent_72%)] opacity-0 blur-3xl transition-all duration-700 group-hover/section:scale-100 group-hover/section:opacity-100" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/4 -z-10 size-96 rounded-full bg-blue-700/10 blur-[110px]" />
            <header className="skills-heading mb-8 flex items-end justify-between gap-6 sm:mb-10">
                <div>
                    <p className="mb-2 font-[var(--font-share-tech-mono)] text-xs uppercase tracking-[0.18em] text-[#22d3ee]">What I work with</p>
                    <h2 id="skills-title" className="bg-gradient-to-r from-[#60a5fa] to-[#22d3ee] bg-clip-text font-[var(--font-rajdhani)] text-5xl font-semibold leading-none tracking-tight text-transparent sm:text-7xl">Skills.</h2>
                </div>
                <p className="mb-1 hidden max-w-xs text-sm leading-6 text-gray-400 sm:block">Tools and technologies I use to build across the stack.</p>
            </header>

            <div className="space-y-8 sm:space-y-10">
                {skillGroups.map(({ title, skills }) => <div key={title}>
                    <h3 className="mb-3 font-[var(--font-share-tech-mono)] text-xs uppercase tracking-[0.16em] text-white/45">{title}</h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
                        {skills.map(({ name, Icon, color }) => (
                            <article key={name} className="skill-card group relative flex min-h-28 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.015] px-3 py-5 transition-all duration-300 ease-out before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.2),transparent_72%)] before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:-translate-y-1.5 hover:border-cyan-300/40 hover:shadow-[0_12px_35px_rgba(37,99,235,0.2),inset_0_0_24px_rgba(34,211,238,0.08)] hover:before:opacity-100 active:-translate-y-1 motion-reduce:transition-none sm:min-h-32 sm:rounded-[20px]">
                                <Icon aria-hidden="true" style={{ color }} className="relative z-10 size-8 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.55)] motion-reduce:transition-none" />
                                <p className="relative z-10 m-0 text-center text-sm font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">{name}</p>
                            </article>
                        ))}
                    </div>
                </div>)}
            </div>
        </section>
    );
}
