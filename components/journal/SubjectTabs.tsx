"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@/lib/useAuth";
import type { Subject } from "@/types/journal";

export function SubjectTabs({
  subjects,
  selectedId,
  onSelect,
  onCreate,
}: {
  subjects: Subject[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: (name: string) => Promise<void>;
}) {
  const { isOwner } = useAuth();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onCreate(name.trim());
      setName("");
      setAdding(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
      {subjects.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          style={{
            border: "1px solid var(--jn-border)",
            borderRadius: 0,
            padding: "6px 14px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            background: selectedId === s.id ? "var(--jn-ink)" : "var(--jn-card)",
            color: selectedId === s.id ? "var(--jn-paper)" : "var(--jn-ink)",
          }}
        >
          {s.name}
        </button>
      ))}

      {isOwner &&
        (adding ? (
          <span style={{ display: "flex", gap: 4 }}>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Subject name"
              style={{
                fontSize: 13,
                padding: "6px 10px",
                border: "1px solid var(--jn-border)",
                borderRadius: 0,
                outline: "none",
              }}
            />
            <button
              onClick={submit}
              disabled={saving}
              style={{
                border: "none",
                background: "var(--jn-ink)",
                color: "var(--jn-paper)",
                borderRadius: 0,
                padding: "6px 12px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </span>
        ) : (
          <button
            onClick={() => setAdding(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              border: "1px dashed var(--jn-border)",
              borderRadius: 0,
              padding: "6px 12px",
              fontSize: 13,
              color: "var(--jn-muted)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <FiPlus size={13} /> Subject
          </button>
        ))}
    </div>
  );
}
