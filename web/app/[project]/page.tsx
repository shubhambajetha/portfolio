import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code2, Globe2 } from "lucide-react";
import { getalllistings } from "../services/productapi";
import { getdetails, type ProjectDetails } from "../services/productdetails";
import { resolveApiAssetUrl } from "../lib/config";

type Props = {
  params: Promise<{ project: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { project: slug } = await params;
  const response = await getalllistings();
  const project = (response.data ?? []).find((item) => item.slug === slug && item.published);

  if (!project) notFound();

  let details: ProjectDetails | null = null;
  try {
    const detailsResponse = await getdetails(project.id);
    details = detailsResponse.data ?? null;
  } catch {
    // A listing can be published before optional long-form details are added.
  }

  const images = [...new Set([project.thumbnail, ...(project.images ?? [])]
    .map((image) => resolveApiAssetUrl(image))
    .filter((image): image is string => Boolean(image)))];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 text-white sm:px-8 sm:py-16">
      <Link href="/#projects" className="mb-8 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white"><ArrowLeft size={16} /> Back to projects</Link>
      <header className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-950 p-7 sm:p-12">
        {images[0] && <img src={images[0]} alt={`${project.title} preview`} className="absolute inset-0 z-0 size-full object-cover opacity-40" />}
        <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
        <div className="relative z-[2]">
        <p className="mb-4 font-[var(--font-share-tech-mono)] text-xs tracking-[0.18em] text-cyan-200">{project.category || "PROJECT"}{project.status ? ` · ${project.status}` : ""}</p>
        <h1 className="max-w-3xl text-4xl font-semibold sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{project.description}</p>
        {!!project.technologies?.length && <div className="mt-7 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-sm">{technology}</span>)}</div>}
        <div className="mt-7 flex flex-wrap gap-3">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-300">Visit project <Globe2 size={16} /></a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-black/20 px-4 py-2 text-sm hover:bg-black/40">Source code <Code2 size={16} /></a>}
        </div>
        </div>
      </header>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-9">
          {details?.overview && <section><h2 className="text-xl font-semibold text-cyan-300">Overview</h2><p className="mt-3 whitespace-pre-line leading-7 text-white/75">{details.overview}</p></section>}
          {details?.problemStatement && <section><h2 className="text-xl font-semibold text-cyan-300">The problem</h2><p className="mt-3 whitespace-pre-line leading-7 text-white/75">{details.problemStatement}</p></section>}
          {details?.solution && <section><h2 className="text-xl font-semibold text-cyan-300">The approach</h2><p className="mt-3 whitespace-pre-line leading-7 text-white/75">{details.solution}</p></section>}
          {!!details?.features?.length && <section><h2 className="text-xl font-semibold text-cyan-300">Key features</h2><ul className="mt-3 list-inside list-disc space-y-2 text-white/75">{details.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>}
          {details?.challenges && <section><h2 className="text-xl font-semibold text-cyan-300">Challenges</h2><p className="mt-3 whitespace-pre-line leading-7 text-white/75">{details.challenges}</p></section>}
          {details?.architecture && <section><h2 className="text-xl font-semibold text-cyan-300">Architecture</h2><p className="mt-3 whitespace-pre-line leading-7 text-white/75">{details.architecture}</p></section>}
          {images.length > 1 && <section><h2 className="text-xl font-semibold text-cyan-300">Gallery</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{images.slice(1).map((image, index) => <img key={image} src={image} alt={`${project.title} gallery image ${index + 1}`} className="aspect-video w-full rounded-xl border border-white/10 object-cover" />)}</div></section>}
          {!details && <p className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/55">More project details are coming soon.</p>}
        </div>
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xs tracking-[0.16em] text-white/50">PROJECT INFO</h2>
          <dl className="mt-5 space-y-4 text-sm">
            {details?.role && <div><dt className="text-white/45">Role</dt><dd className="mt-1 text-white/85">{details.role}</dd></div>}
            {details?.duration && <div><dt className="text-white/45">Duration</dt><dd className="mt-1 text-white/85">{details.duration}</dd></div>}
            <div><dt className="text-white/45">Category</dt><dd className="mt-1 text-white/85">{project.category || "—"}</dd></div>
            <div><dt className="text-white/45">Status</dt><dd className="mt-1 text-white/85">{project.status || "—"}</dd></div>
            <div><dt className="text-white/45">Slug</dt><dd className="mt-1 break-all text-white/85">{project.slug}</dd></div>
          </dl>
        </aside>
      </div>
      <Link href="/#projects" className="mt-10 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white">Back to projects <ArrowUpRight size={15} /></Link>
    </main>
  );
}
