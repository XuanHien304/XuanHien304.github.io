"use client";

import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useAuth } from "@/lib/useAuth";
import type { Category } from "@/types/journal";

function sidebarBtnStyle(active: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    boxSizing: "border-box",
    padding: "7px 8px",
    fontSize: 13,
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    background: active ? "var(--jn-active)" : "transparent",
    color: "var(--jn-ink)",
    textAlign: "left",
    marginBottom: 1,
  };
}

export function CategorySidebar({
  categories,
  counts,
  totalCount,
  selectedId,
  onSelect,
  onCreate,
  onDelete,
}: {
  categories: Category[];
  counts: Record<string, number>;
  totalCount: number;
  selectedId: string | "all";
  onSelect: (id: string | "all") => void;
  onCreate: (name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const { isOwner } = useAuth();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");

  async function submit() {
    if (!name.trim()) return;
    await onCreate(name.trim());
    setName("");
    setAdding(false);
  }

  return (
    <div style={{ width: 190, flexShrink: 0 }}>
      <button onClick={() => onSelect("all")} style={sidebarBtnStyle(selectedId === "all")}>
        <span className="mono" style={{ fontSize: 11, color: "var(--jn-muted)" }}>—</span>
        <span style={{ flex: 1, textAlign: "left" }}>All categories</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--jn-muted)" }}>{totalCount}</span>
      </button>
      <div style={{ height: 1, background: "var(--jn-border)", margin: "6px 0" }} />
      {categories.map((c) => (
        <div key={c.id} className="jrow" style={{ display: "flex", alignItems: "center" }}>
          <button onClick={() => onSelect(c.id)} style={{ ...sidebarBtnStyle(selectedId === c.id), flex: 1 }}>
            <span style={{ flex: 1, textAlign: "left" }}>{c.name}</span>
            <span
              className="mono"
              style={{ fontSize: 11, color: counts[c.id] ? "var(--jn-teal)" : "var(--jn-faint)" }}
            >
              {counts[c.id] || 0}
            </span>
          </button>
          {isOwner && (
            <button
              className="jactions"
              onClick={() => onDelete(c.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--jn-muted)",
                cursor: "pointer",
                padding: 4,
              }}
              aria-label={`Delete ${c.name}`}
            >
              <FiTrash2 size={12} />
            </button>
          )}
        </div>
      ))}

      {isOwner &&
        (adding ? (
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Category name"
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: 12,
                padding: "5px 8px",
                border: "1px solid var(--jn-border)",
                borderRadius: 0,
                outline: "none",
              }}
            />
            <button
              onClick={submit}
              style={{
                border: "none",
                background: "var(--jn-ink)",
                color: "var(--jn-paper)",
                borderRadius: 0,
                padding: "5px 8px",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              boxSizing: "border-box",
              marginTop: 4,
              padding: "7px 8px",
              fontSize: 12,
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
              background: "transparent",
              color: "var(--jn-muted)",
            }}
          >
            <FiPlus size={12} /> Add category
          </button>
        ))}
    </div>
  );
}
