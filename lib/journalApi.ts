import { supabase } from "@/lib/supabase";
import type { Category, Entry, EntryDraft, Subject } from "@/types/journal";

async function requireClient() {
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function fetchSubjects(area: string): Promise<Subject[]> {
  const client = await requireClient();
  const { data, error } = await client.from("subjects").select("*").eq("area", area).order("sort_order");
  if (error) throw error;
  return data as Subject[];
}

export async function fetchCategories(): Promise<Category[]> {
  const client = await requireClient();
  const { data, error } = await client.from("categories").select("*").order("sort_order");
  if (error) throw error;
  return data as Category[];
}

export async function fetchEntries(): Promise<Entry[]> {
  const client = await requireClient();
  const { data, error } = await client.from("entries").select("*").order("entry_date", { ascending: false });
  if (error) throw error;
  return data as Entry[];
}

export interface AreaStats {
  entries: number;
  // Categories in the area, e.g. one per DSA pattern.
  topics: number;
  lastEntry: string | null;
}

// Counts for one area, for the main-page preview: no entry content.
export async function fetchAreaStats(area: string): Promise<AreaStats> {
  const client = await requireClient();
  const subjects = await fetchSubjects(area);
  if (subjects.length === 0) return { entries: 0, topics: 0, lastEntry: null };
  const ids = subjects.map((s) => s.id);
  const [entries, topics, latest] = await Promise.all([
    client.from("entries").select("id", { count: "exact", head: true }).in("subject_id", ids),
    client.from("categories").select("id", { count: "exact", head: true }).in("subject_id", ids),
    client.from("entries").select("entry_date").in("subject_id", ids).order("entry_date", { ascending: false }).limit(1),
  ]);
  const error = entries.error ?? topics.error ?? latest.error;
  if (error) throw error;
  return {
    entries: entries.count ?? 0,
    topics: topics.count ?? 0,
    lastEntry: (latest.data as { entry_date: string }[])[0]?.entry_date ?? null,
  };
}

export async function createSubject(name: string, sortOrder: number, area: string): Promise<Subject> {
  const client = await requireClient();
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const { data, error } = await client
    .from("subjects")
    .insert({ name, slug, sort_order: sortOrder, area })
    .select()
    .single();
  if (error) throw error;
  return data as Subject;
}

export async function deleteSubject(id: string): Promise<void> {
  const client = await requireClient();
  const { error } = await client.from("subjects").delete().eq("id", id);
  if (error) throw error;
}

export async function createCategory(subjectId: string, name: string, sortOrder: number): Promise<Category> {
  const client = await requireClient();
  const { data, error } = await client
    .from("categories")
    .insert({ subject_id: subjectId, name, sort_order: sortOrder })
    .select()
    .single();
  if (error) throw error;
  return data as Category;
}

export async function renameCategory(id: string, name: string): Promise<void> {
  const client = await requireClient();
  const { error } = await client.from("categories").update({ name }).eq("id", id);
  if (error) throw error;
}

export async function deleteCategory(id: string): Promise<void> {
  const client = await requireClient();
  const { error } = await client.from("categories").delete().eq("id", id);
  if (error) throw error;
}

export async function createEntry(draft: EntryDraft): Promise<Entry> {
  const client = await requireClient();
  const { data, error } = await client.from("entries").insert(draft).select().single();
  if (error) throw error;
  return data as Entry;
}

export async function updateEntry(id: string, draft: EntryDraft): Promise<Entry> {
  const client = await requireClient();
  const { data, error } = await client
    .from("entries")
    .update({ ...draft, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Entry;
}

export async function deleteEntry(id: string): Promise<void> {
  const client = await requireClient();
  const { error } = await client.from("entries").delete().eq("id", id);
  if (error) throw error;
}
