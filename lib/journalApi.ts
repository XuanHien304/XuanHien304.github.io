import { supabase } from "@/lib/supabase";
import type { Category, Entry, EntryDraft, Subject } from "@/types/journal";

async function requireClient() {
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function fetchSubjects(): Promise<Subject[]> {
  const client = await requireClient();
  const { data, error } = await client.from("subjects").select("*").order("sort_order");
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

export async function createSubject(name: string): Promise<Subject> {
  const client = await requireClient();
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const { data, error } = await client
    .from("subjects")
    .insert({ name, slug, sort_order: Date.now() })
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

export async function createCategory(subjectId: string, name: string): Promise<Category> {
  const client = await requireClient();
  const { data, error } = await client
    .from("categories")
    .insert({ subject_id: subjectId, name, sort_order: Date.now() })
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
