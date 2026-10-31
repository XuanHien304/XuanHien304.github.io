"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import type { Category, Entry, EntryDraft } from "@/types/journal";

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "8px 10px",
  fontSize: 13,
  border: "1px solid var(--jn-border)",
  borderRadius: 3,
  outline: "none",
  background: "var(--jn-card)",
};

function LabeledArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--jn-muted)", marginBottom: 4 }}>
        {label}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="In your own words…"
        style={{ ...inputStyle, resize: "vertical", width: "100%", boxSizing: "border-box" }}
      />
    </div>
  );
}

export function EntryFormModal({
  subjectId,
  categories,
  editing,
  onClose,
  onSave,
}: {
  subjectId: string;
  categories: Category[];
  editing: Entry | null;
  onClose: () => void;
  onSave: (draft: EntryDraft) => Promise<void>;
}) {
  const [draft, setDraft] = useState<EntryDraft>(
    editing
      ? {
          subject_id: editing.subject_id,
          category_id: editing.category_id,
          problem: editing.problem,
          entry_date: editing.entry_date,
          trigger: editing.trigger,
          invariant: editing.invariant,
          complexity: editing.complexity,
          taught_with: editing.taught_with,
          first_mistake: editing.first_mistake,
        }
      : {
          subject_id: subjectId,
          category_id: null,
          problem: "",
          entry_date: new Date().toISOString().slice(0, 10),
          trigger: "",
          invariant: "",
          complexity: "",
          taught_with: "",
          first_mistake: "",
        },
  );
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!draft.problem.trim()) return;
    setSaving(true);
    try {
      await onSave(draft);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--jn-overlay)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 16px",
        overflowY: "auto",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--jn-card)",
          borderRadius: 4,
          width: "100%",
          maxWidth: 520,
          padding: 24,
          border: "1px solid var(--jn-border)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{editing ? "Edit entry" : "New entry"}</h2>
          <button
            onClick={onClose}
            style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--jn-muted)" }}
          >
            <FiX size={16} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <select
              value={draft.category_id ?? ""}
              onChange={(e) => setDraft({ ...draft, category_id: e.target.value || null })}
              style={{ ...inputStyle, flex: 1 }}
            >
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={draft.entry_date}
              onChange={(e) => setDraft({ ...draft, entry_date: e.target.value })}
              style={{ ...inputStyle, width: 140 }}
            />
          </div>

          <input
            placeholder="Problem name"
            value={draft.problem}
            onChange={(e) => setDraft({ ...draft, problem: e.target.value })}
            style={inputStyle}
          />
          <LabeledArea label="Trigger" value={draft.trigger ?? ""} onChange={(v) => setDraft({ ...draft, trigger: v })} />
          <LabeledArea
            label="Invariant"
            value={draft.invariant ?? ""}
            onChange={(v) => setDraft({ ...draft, invariant: v })}
          />
          <input
            placeholder="Complexity — e.g. O(n) time, O(1) space"
            value={draft.complexity ?? ""}
            onChange={(e) => setDraft({ ...draft, complexity: e.target.value })}
            style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5 }}
          />
          <input
            placeholder="Taught me this alongside…"
            value={draft.taught_with ?? ""}
            onChange={(e) => setDraft({ ...draft, taught_with: e.target.value })}
            style={inputStyle}
          />
          <LabeledArea
            label="First mistake"
            value={draft.first_mistake ?? ""}
            onChange={(v) => setDraft({ ...draft, first_mistake: v })}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              color: "var(--jn-ink)",
              border: "1px solid var(--jn-border)",
              borderRadius: 3,
              padding: "8px 16px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            style={{
              background: "var(--jn-ink)",
              color: "var(--jn-paper)",
              border: "none",
              borderRadius: 3,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {saving ? "Saving…" : "Save entry"}
          </button>
        </div>
      </div>
    </div>
  );
}
