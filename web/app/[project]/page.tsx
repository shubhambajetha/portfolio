import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "../data/projects";

type Props = {
  params: Promise<{ project: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ project: slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { project: slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 text-white sm:px-8 sm:py-20">
      <Link href="/#projects" className="mb-10 inline-flex text-sm text-cyan-300 hover:text-white">← Back to projects</Link>
      <header className={`relative isolate overflow-hidden rounded-3xl bg-gradient-to-br ${project.coverStyle} p-7 sm:p-12`}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/20" />
        <p className="mb-4 font-[var(--font-share-tech-mono)] text-xs tracking-[0.18em] text-white/80">{project.category}</p>
        <h1 className="max-w-3xl text-4xl font-semibold sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{project.description}</p>
        <div className="mt-7 flex flex-wrap gap-2">{project.stack.map((technology) => <span key={technology} className="rounded-full border border-white/30 bg-black/10 px-3 py-1 text-sm">{technology}</span>)}</div>
      </header>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-9">
          <section><h2 className="text-xl font-semibold text-cyan-300">Overview</h2><p className="mt-3 leading-7 text-white/75">{project.overview}</p></section>
          <section><h2 className="text-xl font-semibold text-cyan-300">The problem</h2><p className="mt-3 leading-7 text-white/75">{project.problem}</p></section>
          <section><h2 className="text-xl font-semibold text-cyan-300">The approach</h2><p className="mt-3 leading-7 text-white/75">{project.solution}</p></section>
          <section><h2 className="text-xl font-semibold text-cyan-300">Key features</h2><ul className="mt-3 list-inside list-disc space-y-2 text-white/75">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
        </div>
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xs tracking-[0.16em] text-white/50">PROJECT INFO</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div><dt className="text-white/45">Role</dt><dd className="mt-1 text-white/85">{project.role}</dd></div>
            <div><dt className="text-white/45">Duration</dt><dd className="mt-1 text-white/85">{project.duration}</dd></div>
            <div><dt className="text-white/45">Slug</dt><dd className="mt-1 break-all text-white/85">{project.slug}</dd></div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
