"use client";

import { useState } from "react";
import ListingView from "../components/admin/ListingView";
import DetailsView from "../components/admin/DetailsView";
import ExperienceView from "../components/admin/ExperienceView";

const sections = ["Listings", "Project details", "Experience"] as const;
type Section = (typeof sections)[number];


export default function AdminPage() {
  const [active, setActive] = useState<Section>("Listings");
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-12 text-white sm:px-8">
      <h1 className="mb-6 text-3xl font-semibold">Content</h1>
      <nav aria-label="Content sections" className="mb-8 flex flex-wrap gap-2">
        {sections.map((section) => <button key={section} onClick={() => setActive(section)} aria-pressed={active === section} className={`rounded-full border px-4 py-2 ${active === section ? "border-cyan-400 bg-cyan-500/15" : "border-white/15"}`}>{section}</button>)}
      </nav>
      {active === "Listings" ? <ListingView /> : active === "Project details" ? <DetailsView /> : <ExperienceView />}
    </main>
  );
}
