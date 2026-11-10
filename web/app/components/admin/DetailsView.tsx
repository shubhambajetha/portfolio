"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createdetails, deletedetails, getalldetails, updatedetails } from "../../services/productdetails";
import type { ProjectDetails, ProjectDetailsPayload } from "../../services/productdetails";
import { getalllistings } from "../../services/productapi";
import type { listing } from "../../types/listingtype";

const emptyForm: ProjectDetailsPayload = {
  overview: "", problemStatement: "", solution: "", features: [],
  challenges: "", architecture: "", role: "", duration: "",
};

export default function DetailsView() {
  const [items, setItems] = useState<ProjectDetails[]>([]);
  const [listings, setListings] = useState<listing[]>([]);
  const [listingId, setListingId] = useState("");
  const [form, setForm] = useState<ProjectDetailsPayload>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    try { const result = await getalldetails(); setItems(result.data ?? []); setError(""); }
    catch { setError("Could not load project details."); }
  }

  useEffect(() => {
    let active = true;
    Promise.all([getalldetails(), getalllistings()])
      .then(([detailsResult, listingsResult]) => {
        if (active) {
          setItems(detailsResult.data ?? []);
          setListings(listingsResult.data ?? []);
          setError("");
        }
      })
      .catch(() => {
        if (active) setError("Could not load project details.");
      });
    return () => { active = false; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (editingId) await updatedetails(editingId, form);
      else await createdetails(listingId, form);
      setEditingId(null); setListingId(""); setForm(emptyForm); await refresh();
    } catch { setError("Could not save project details. Check the listing ID and try again."); }
  }

  function edit(item: ProjectDetails) {
    setEditingId(item.projectListingId); setListingId(item.projectListingId);
    setForm({
      overview: item.overview ?? "", problemStatement: item.problemStatement ?? "",
      solution: item.solution ?? "", features: item.features ?? [],
      challenges: item.challenges ?? "", architecture: item.architecture ?? "",
      role: item.role ?? "", duration: item.duration ?? "",
    });
  }

  async function remove(id: string) {
    if (!window.confirm("Delete these project details?")) return;
    try { await deletedetails(id); await refresh(); }
    catch { setError("Could not delete project details."); }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Project details</h2>
      <form onSubmit={submit} className="grid gap-3 rounded-xl border border-white/15 p-4 sm:grid-cols-2">
        <select required disabled={!!editingId} value={listingId} onChange={(e) => setListingId(e.target.value)} className="rounded bg-neutral-900 p-3 sm:col-span-2">
          <option value="">Select a project listing</option>
          {listings.filter((listing) => editingId === listingId || !items.some((item) => item.projectListingId === listing.id)).map((listing) => <option key={listing.id} value={listing.id}>{listing.title} · /{listing.slug}</option>)}
        </select>
        {(["overview", "problemStatement", "solution", "challenges", "architecture", "role", "duration"] as const).map((field) => <textarea key={field} placeholder={field} value={form[field] ?? ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="min-h-20 rounded bg-white/10 p-3" />)}
        <textarea placeholder="Features (one per line)" value={(form.features ?? []).join("\n")} onChange={(e) => setForm({ ...form, features: e.target.value.split("\n").map((value) => value.trim()).filter(Boolean) })} className="min-h-20 rounded bg-white/10 p-3 sm:col-span-2" />
        <div className="flex gap-2 sm:col-span-2"><button className="rounded bg-cyan-700 px-4 py-2">{editingId ? "Save changes" : "Create details"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setListingId(""); setForm(emptyForm); }} className="rounded border border-white/20 px-4 py-2">Cancel</button>}</div>
      </form>
      {error && <p role="alert" className="text-red-400">{error}</p>}
      <ul className="divide-y divide-white/10">{items.map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><span>{item.projectListing?.title ?? item.overview ?? item.projectListingId} <small className="text-white/50">{item.projectListing?.slug ? `/${item.projectListing.slug} · ` : ""}Listing ${item.projectListingId} · {item.features?.length ?? 0} features</small><span className="block text-xs text-white/50">ID {item.id} · created {new Date(item.createdAt).toLocaleString()}</span></span><span className="flex gap-2"><button onClick={() => edit(item)} className="rounded border border-white/20 px-3 py-1">Edit</button><button onClick={() => void remove(item.projectListingId)} className="rounded border border-red-400/40 px-3 py-1 text-red-300">Delete</button></span></li>)}</ul>
    </section>
  );
}
