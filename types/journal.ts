export interface Subject {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export interface Category {
  id: string;
  subject_id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export interface Entry {
  id: string;
  subject_id: string;
  category_id: string | null;
  problem: string;
  entry_date: string;
  trigger: string | null;
  invariant: string | null;
  complexity: string | null;
  taught_with: string | null;
  first_mistake: string | null;
  created_at: string;
  updated_at: string;
}

export type EntryDraft = Pick<
  Entry,
  | "subject_id"
  | "category_id"
  | "problem"
  | "entry_date"
  | "trigger"
  | "invariant"
  | "complexity"
  | "taught_with"
  | "first_mistake"
>;
