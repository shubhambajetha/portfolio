"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Globe2 } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import type { listing } from "@/app/types/listingtype";
import { resolveApiAssetUrl } from "@/app/lib/config";

interface ProjectProps {
  projectdata: listing[];
}

export default function FifthSection({ projectdata }: ProjectProps) {
  const projects = [...projectdata]
    .filter((project) => project.published)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder);

  return (
    <section id="projects" className="group/section relative isolate mx-auto scroll-mt-24 max-w-7xl overflow-hidden px-5 py-20 text-white sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 scale-75 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2),rgba(34,211,238,0.1)_38%,transparent_72%)] opacity-0 blur-3xl transition-all duration-700 group-hover/section:scale-100 group-hover/section:opacity-100" />
      <div className="mb-7 flex items-end justify-between gap-3 sm:gap-6">
        <div>
          <p className="mb-2 font-[var(--font-share-tech-mono)] text-xs tracking-[0.18em] text-[#22d3ee]">SELECTED WORK</p>
          <h2 className="bg-gradient-to-r from-[#60a5fa] to-[#22d3ee] bg-clip-text text-[clamp(1.7rem,7vw,3rem)] font-semibold text-transparent sm:text-5xl">My Projects.</h2>
        </div>
        {projects.length > 1 && <div className="flex gap-2">
          <button className="project-prev grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-gray-300 transition hover:border-cyan-400/60 hover:bg-blue-500/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400" aria-label="Previous project"><ArrowLeft size={18} /></button>
          <button className="project-next grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-gray-300 transition hover:border-cyan-400/60 hover:bg-blue-500/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400" aria-label="Next project"><ArrowRight size={18} /></button>
        </div>}
      </div>

      {projects.length === 0 ? <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-sm text-neutral-400">Projects will appear here soon.</p> : <Swiper
        modules={[Navigation, A11y, Keyboard]}
        navigation={projects.length > 1 ? { prevEl: ".project-prev", nextEl: ".project-next" } : false}
        keyboard={{ enabled: true }}
        spaceBetween={14}
        slidesPerView={1.08}
        breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 18 }, 1024: { slidesPerView: 3, spaceBetween: 20 } }}
      >
        {projects.map((project) => {
          const image = resolveApiAssetUrl(project.thumbnail || project.images?.[0]);
          const technologies = project.technologies ?? [];
          return <SwiperSlide key={project.id} className="!h-auto">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/90 transition hover:border-cyan-400/30">
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-500">
                {image && <img src={image} alt={`${project.title} preview`} className="absolute inset-0 size-full object-cover" />}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <span className="font-[var(--font-share-tech-mono)] text-xs tracking-[0.18em] text-white/90">{project.category || "PROJECT"}</span>
                  {project.featured && <span className="rounded-full border border-cyan-200/30 bg-cyan-950/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-cyan-100">Featured</span>}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.status && <span className="shrink-0 rounded-full bg-white/[0.07] px-2 py-1 text-[10px] text-neutral-300">{project.status}</span>}
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-400">{project.description}</p>
                {technologies.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">
                  {technologies.map((technology) => <span key={technology} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-neutral-300">{technology}</span>)}
                </div>}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                  <Link href={`/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">Details <ArrowUpRight size={16} aria-hidden="true" /></Link>
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-neutral-300 hover:text-white"><Globe2 size={15} aria-hidden="true" /> Live</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-neutral-300 hover:text-white"><Code2 size={15} aria-hidden="true" /> Code</a>}
                </div>
              </div>
            </article>
          </SwiperSlide>;
        })}
      </Swiper>}
    </section>
  );
}
