"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { listing, listingpayload } from "../../types/listingtype";
import { createlisting, deletelisting, getalllistings, updatelisting } from "../../services/productapi";

const emptyForm: listingpayload = {
  title: "", slug: "", description: "", thumbnail: "", images: [], liveUrl: "",
  githubUrl: "", category: "", technologies: [], featured: false,
  status: "COMPLETED", published: true, sortOrder: 0,
};

export default function ListingView() {
  const [items, setItems] = useState<listing[]>([]);
  const [form, setForm] = useState<listingpayload>(emptyForm);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    try {
      const result = await getalllistings();
      setItems(result.data ?? []);
      setError("");
    } catch {
      setError("Could not load listings.");
    }
  }

  useEffect(() => {
    let active = true;
    getalllistings()
      .then((result) => {
        if (active) {
          setItems(result.data ?? []);
          setError("");
        }
      })
      .catch(() => {
        if (active) setError("Could not load listings.");
      });
    return () => { active = false; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const payload = {
        ...form,
        githubUrl: form.githubUrl?.trim() || null,
        images: form.images?.map((value) => value.trim()).filter(Boolean),
        technologies: form.technologies?.map((value) => value.trim()).filter(Boolean),
      };
      if (editingId) await updatelisting(editingId, payload, thumbnailFile ?? undefined, galleryFiles);
      else await createlisting(payload, thumbnailFile ?? undefined, galleryFiles);
      setForm(emptyForm);
      setThumbnailFile(null);
      setGalleryFiles([]);
      setEditingId(null);
      await refresh();
    } catch {
      setError("Could not save listing.");
    }
  }

  function edit(item: listing) {
    setEditingId(item.id);
    setThumbnailFile(null);
    setGalleryFiles([]);
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description,
      thumbnail: item.thumbnail,
      images: item.images,
      liveUrl: item.liveUrl,
      githubUrl: item.githubUrl,
      category: item.category ?? undefined,
      technologies: item.technologies,
      featured: item.featured,
      status: item.status,
      published: item.published,
      sortOrder: item.sortOrder,
    });
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this listing?")) return;
    try { await deletelisting(id); await refresh(); }
    catch { setError("Could not delete listing."); }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Listings</h2>
      <form onSubmit={submit} className="grid gap-3 rounded-xl border border-white/15 p-4 sm:grid-cols-2">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded bg-white/10 p-3" />
        <input required placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded bg-white/10 p-3" />
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded bg-white/10 p-3 sm:col-span-2" />
        <input placeholder="Thumbnail URL or path" value={form.thumbnail ?? ""} onChange={(e) => setForm({ ...form, thumbnail: e.target.value || null })} className="rounded bg-white/10 p-3" />
        <label className="flex flex-col gap-1 text-sm text-white/60">Choose a local image (optional)<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)} className="rounded bg-white/10 p-3 text-base text-white file:mr-3 file:rounded file:border-0 file:bg-cyan-700 file:px-3 file:py-2" /><span className="text-xs">PNG, JPG, WEBP, or GIF · up to 10 MB{thumbnailFile ? ` · Selected: ${thumbnailFile.name}` : ""}</span></label>
        <input placeholder="Category" value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded bg-white/10 p-3" />
        <input placeholder="Live URL" value={form.liveUrl ?? ""} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="rounded bg-white/10 p-3" />
        <input placeholder="GitHub URL (optional)" value={form.githubUrl ?? ""} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className="rounded bg-white/10 p-3" />
        <textarea placeholder="Image paths (one per line)" value={(form.images ?? []).join("\n")} onChange={(e) => setForm({ ...form, images: e.target.value.split("\n") })} className="rounded bg-white/10 p-3" />
        <label className="flex flex-col gap-1 text-sm text-white/60">Choose gallery images<input type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => setGalleryFiles(Array.from(e.target.files ?? []))} className="rounded bg-white/10 p-3 text-base text-white file:mr-3 file:rounded file:border-0 file:bg-cyan-700 file:px-3 file:py-2" /><span className="text-xs">Select up to 20 PNG, JPG, WEBP, or GIF images, 10 MB each{galleryFiles.length ? ` · ${galleryFiles.length} selected` : ""}</span></label>
        <textarea placeholder="Technologies (one per line)" value={(form.technologies ?? []).join("\n")} onChange={(e) => setForm({ ...form, technologies: e.target.value.split("\n") })} className="rounded bg-white/10 p-3" />
        <select value={form.status ?? "COMPLETED"} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded bg-neutral-900 p-3"><option value="COMPLETED">Completed</option><option value="IN_PROGRESS">In progress</option><option value="PLANNED">Planned</option></select>
        <input type="number" placeholder="Sort order" value={form.sortOrder ?? 0} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} className="rounded bg-white/10 p-3" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured ?? false} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.published ?? true} onChange={(e) => setForm({ ...form, published: e.target.checked })} />Published</label>
        <div className="flex gap-2 sm:col-span-2">
          <button className="rounded bg-cyan-700 px-4 py-2">{editingId ? "Save changes" : "Create listing"}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); setThumbnailFile(null); setGalleryFiles([]); }} className="rounded border border-white/20 px-4 py-2">Cancel</button>}
        </div>
      </form>
      {error && <p role="alert" className="text-red-400">{error}</p>}
      <ul className="divide-y divide-white/10">
        {items.map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
          <span>{item.title} <small className="text-white/50">/{item.slug} · order {item.sortOrder} · {item.status} · {item.published ? "published" : "draft"}</small><span className="block text-xs text-white/50">ID {item.id} · created {new Date(item.createdAt).toLocaleString()}</span></span>
          <span className="flex gap-2"><button onClick={() => edit(item)} className="rounded border border-white/20 px-3 py-1">Edit</button><button onClick={() => void remove(item.id)} className="rounded border border-red-400/40 px-3 py-1 text-red-300">Delete</button></span>
        </li>)}
      </ul>
    </section>
  );
}
