"use client";

import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";
import {
  createCategory,
  createEntry,
  createSubject,
  deleteCategory,
  deleteEntry,
  fetchCategories,
  fetchEntries,
  fetchSubjects,
  updateEntry,
} from "@/lib/journalApi";
import type { Category, Entry, EntryDraft, Subject } from "@/types/journal";
import { AuthBar } from "@/components/journal/AuthBar";
import { SubjectTabs } from "@/components/journal/SubjectTabs";
import { CategorySidebar } from "@/components/journal/CategorySidebar";
import { EntryRow } from "@/components/journal/EntryRow";
import { EntryFormModal } from "@/components/journal/EntryFormModal";

type LoadState = "loading" | "ready" | "error";

export function JournalApp() {
  const { isOwner } = useAuth();
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  function describeError(err: unknown): string {
    if (err && typeof err === "object" && "message" in err) {
      const message = String((err as { message?: unknown }).message);
      if (message.includes("row-level security") || message.includes("policy")) {
        return "That was rejected by the database's access rules -- you may not be signed in as the owner.";
      }
      return message;
    }
    return "Something went wrong saving that.";
  }

  async function guarded(action: () => Promise<void>) {
    try {
      setMutationError(null);
      await action();
    } catch (err) {
      setMutationError(describeError(err));
    }
  }

  async function loadAll() {
    setLoadState("loading");
    try {
      const [s, c, e] = await Promise.all([fetchSubjects(), fetchCategories(), fetchEntries()]);
      setSubjects(s);
      setCategories(c);
      setEntries(e);
      setSelectedSubjectId((prev) => prev ?? s[0]?.id ?? null);
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }

  useEffect(() => {
    if (isSupabaseConfigured) loadAll();
    else setLoadState("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoriesForSubject = useMemo(
    () => categories.filter((c) => c.subject_id === selectedSubjectId),
    [categories, selectedSubjectId],
  );

  const entriesForSubject = useMemo(
    () => entries.filter((e) => e.subject_id === selectedSubjectId),
    [entries, selectedSubjectId],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of entriesForSubject) {
      if (e.category_id) counts[e.category_id] = (counts[e.category_id] ?? 0) + 1;
    }
    return counts;
  }, [entriesForSubject]);

  const visibleEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entriesForSubject
      .filter((e) => selectedCategoryId === "all" || e.category_id === selectedCategoryId)
      .filter((e) => {
        if (!q) return true;
        const blob = [e.problem, e.trigger, e.invariant, e.complexity, e.taught_with, e.first_mistake]
          .join(" ")
          .toLowerCase();
        return blob.includes(q);
      })
      .sort((a, b) => (a.entry_date < b.entry_date ? 1 : -1));
  }, [entriesForSubject, selectedCategoryId, search]);

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function openNewEntry() {
    setEditingEntry(null);
    setFormOpen(true);
  }

  function openEditEntry(entry: Entry) {
    setEditingEntry(entry);
    setFormOpen(true);
  }

  async function saveEntry(draft: EntryDraft) {
    await guarded(async () => {
      if (editingEntry) {
        const updated = await updateEntry(editingEntry.id, draft);
        setEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      } else {
        const created = await createEntry(draft);
        setEntries((prev) => [created, ...prev]);
      }
      setFormOpen(false);
    });
  }

  async function removeEntry(id: string) {
    await guarded(async () => {
      await deleteEntry(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    });
  }

  async function addSubject(name: string) {
    await guarded(async () => {
      const created = await createSubject(name);
      setSubjects((prev) => [...prev, created]);
      setSelectedSubjectId(created.id);
    });
  }

  async function addCategory(name: string) {
    await guarded(async () => {
      if (!selectedSubjectId) return;
      const created = await createCategory(selectedSubjectId, name);
      setCategories((prev) => [...prev, created]);
    });
  }

  async function removeCategory(id: string) {
    await guarded(async () => {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setEntries((prev) => prev.map((e) => (e.category_id === id ? { ...e, category_id: null } : e)));
      if (selectedCategoryId === id) setSelectedCategoryId("all");
    });
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="journal-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <p className="mono" style={{ fontSize: 13, color: "var(--jn-muted)", textAlign: "center", maxWidth: 420 }}>
          The Learning Journal isn&apos;t connected to a database yet. Set
          NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (see
          supabase/README.md) and rebuild.
        </p>
      </div>
    );
  }

  if (loadState === "error") {
    return (
      <div className="journal-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ textAlign: "center" }}>
          <p className="mono" style={{ fontSize: 13, color: "var(--jn-muted)", marginBottom: 12 }}>
            Couldn&apos;t reach the journal database — it may be waking up. Try again in a moment.
          </p>
          <button
            onClick={loadAll}
            style={{
              border: "1px solid var(--jn-border)",
              background: "#FFFFFF",
              borderRadius: 3,
              padding: "8px 16px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) ?? null;

  return (
    <div className="journal-root">
      {mutationError && (
        <div
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "var(--jn-rust)",
            color: "#FFFFFF",
            borderRadius: 4,
            padding: "10px 14px",
            fontSize: 13,
            maxWidth: "min(90vw, 480px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          <span>{mutationError}</span>
          <button
            onClick={() => setMutationError(null)}
            style={{ border: "none", background: "transparent", color: "#FFFFFF", cursor: "pointer", flexShrink: 0 }}
          >
            Dismiss
          </button>
        </div>
      )}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 20px 64px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>Learning Journal</h1>
            <p className="mono" style={{ fontSize: 12, color: "var(--jn-muted)", margin: "4px 0 0" }}>
              trigger · invariant · complexity · mistake
            </p>
          </div>
          <AuthBar />
        </div>

        <div style={{ marginBottom: 20 }}>
          <SubjectTabs subjects={subjects} selectedId={selectedSubjectId} onSelect={setSelectedSubjectId} onCreate={addSubject} />
        </div>

        {loadState === "loading" ? (
          <p className="mono" style={{ fontSize: 13, color: "var(--jn-muted)" }}>
            Loading…
          </p>
        ) : subjects.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--jn-muted)" }}>
            {isOwner ? "Add a subject above to get started." : "No subjects yet."}
          </p>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <FiSearch size={15} style={{ position: "absolute", left: 12, top: 11, color: "var(--jn-placeholder)" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search entries…"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "9px 12px 9px 34px",
                    fontSize: 13,
                    border: "1px solid var(--jn-border)",
                    borderRadius: 3,
                    background: "#FFFFFF",
                    outline: "none",
                  }}
                />
              </div>
              {isOwner && (
                <button
                  onClick={openNewEntry}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "var(--jn-ink)",
                    color: "var(--jn-paper)",
                    border: "none",
                    borderRadius: 3,
                    padding: "9px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  <FiPlus size={15} /> New entry
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: 28 }}>
              {isOwner && (
                <CategorySidebar
                  categories={categoriesForSubject}
                  counts={categoryCounts}
                  totalCount={entriesForSubject.length}
                  selectedId={selectedCategoryId}
                  onSelect={setSelectedCategoryId}
                  onCreate={addCategory}
                  onDelete={removeCategory}
                />
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                {visibleEntries.length === 0 && (
                  <div style={{ fontSize: 13, color: "var(--jn-muted)", padding: "24px 0" }}>
                    {entriesForSubject.length === 0
                      ? `No entries in ${selectedSubject?.name ?? "this subject"} yet.`
                      : "Nothing matches that filter."}
                  </div>
                )}
                {visibleEntries.map((entry) => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    category={categories.find((c) => c.id === entry.category_id)}
                    isOpen={expanded.has(entry.id)}
                    onToggle={() => toggleExpand(entry.id)}
                    onEdit={() => openEditEntry(entry)}
                    onDelete={() => removeEntry(entry.id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {formOpen && selectedSubjectId && (
        <EntryFormModal
          subjectId={selectedSubjectId}
          categories={categoriesForSubject}
          editing={editingEntry}
          onClose={() => setFormOpen(false)}
          onSave={saveEntry}
        />
      )}
    </div>
  );
}
