"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createexperience, deleteexperience, getallexperience, updateexperience } from "../../services/experince";
import type { Experience, ExperiencePayload } from "../../services/experince";

const emptyForm: ExperiencePayload = { title: "", subtitle: "", timeDate: "", description: "" };

export default function ExperienceView() {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState<ExperiencePayload>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    try { const result = await getallexperience(); setItems(result.data ?? []); setError(""); }
    catch { setError("Could not load experience entries."); }
  }

  useEffect(() => {
    let active = true;
    getallexperience()
      .then((result) => {
        if (active) {
          setItems(result.data ?? []);
          setError("");
        }
      })
      .catch(() => {
        if (active) setError("Could not load experience entries.");
      });
    return () => { active = false; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (editingId) await updateexperience(editingId, form);
      else await createexperience(form);
      setEditingId(null); setForm(emptyForm); await refresh();
    } catch { setError("Could not save experience entry."); }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this experience entry?")) return;
    try { await deleteexperience(id); await refresh(); }
    catch { setError("Could not delete experience entry."); }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <form onSubmit={submit} className="grid gap-3 rounded-xl border border-white/15 p-4 sm:grid-cols-2">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded bg-white/10 p-3" />
        <input required placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="rounded bg-white/10 p-3" />
        <input required placeholder="Date or period" value={form.timeDate} onChange={(e) => setForm({ ...form, timeDate: e.target.value })} className="rounded bg-white/10 p-3" />
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded bg-white/10 p-3" />
        <div className="flex gap-2 sm:col-span-2"><button className="rounded bg-cyan-700 px-4 py-2">{editingId ? "Save changes" : "Create experience"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded border border-white/20 px-4 py-2">Cancel</button>}</div>
      </form>
      {error && <p role="alert" className="text-red-400">{error}</p>}
      <ul className="divide-y divide-white/10">{items.map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><span>{item.title} <small className="text-white/50">{item.subtitle} · {item.timeDate}</small><span className="block text-xs text-white/50">ID {item.id} · created {new Date(item.createdAt).toLocaleString()} · updated {new Date(item.updatedAt).toLocaleString()}</span><span className="block text-sm text-white/70">{item.description}</span></span><span className="flex gap-2"><button onClick={() => { setEditingId(item.id); setForm({ title: item.title, subtitle: item.subtitle, timeDate: item.timeDate, description: item.description }); }} className="rounded border border-white/20 px-3 py-1">Edit</button><button onClick={() => void remove(item.id)} className="rounded border border-red-400/40 px-3 py-1 text-red-300">Delete</button></span></li>)}</ul>
    </section>
  );
}
