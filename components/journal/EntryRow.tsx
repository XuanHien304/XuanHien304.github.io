"use client";

import { FiChevronDown, FiTrash2 } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { useAuth } from "@/lib/useAuth";
import type { Category, Entry } from "@/types/journal";

function Field({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string | null;
  mono?: boolean;
  accent?: boolean;
}) {
  if (!value) return null;
  return (
    <div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--jn-muted)", marginBottom: 2 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          color: accent ? "var(--jn-rust)" : "var(--jn-ink)",
          fontFamily: mono ? "'IBM Plex Mono', monospace" : "inherit",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function EntryRow({
  entry,
  category,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
}: {
  entry: Entry;
  category: Category | undefined;
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { isOwner } = useAuth();

  return (
    <div
      className="jrow"
      style={{ border: "1px solid var(--jn-border)", borderRadius: 3, marginBottom: 10, background: "var(--jn-card)" }}
    >
      <div
        onClick={onToggle}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", cursor: "pointer" }}
      >
        <FiChevronDown
          size={14}
          style={{
            color: "var(--jn-placeholder)",
            transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 120ms",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{entry.problem}</span>
        {category && (
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--jn-teal)",
              background: "var(--jn-teal-bg)",
              padding: "2px 7px",
              borderRadius: 2,
              whiteSpace: "nowrap",
            }}
          >
            {category.name}
          </span>
        )}
        <span className="mono" style={{ fontSize: 11, color: "var(--jn-placeholder)", whiteSpace: "nowrap" }}>
          {entry.entry_date}
        </span>
        {isOwner && (
          <div className="jactions" style={{ display: "flex", gap: 4 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "var(--jn-muted)",
                padding: 4,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaPencilAlt size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "var(--jn-muted)",
                padding: 4,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FiTrash2 size={13} />
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div style={{ padding: "2px 14px 16px 38px", display: "flex", flexDirection: "column", gap: 10 }}>
          <Field label="Trigger" value={entry.trigger} />
          <Field label="Invariant" value={entry.invariant} />
          <Field label="Complexity" value={entry.complexity} mono />
          <Field label="Taught me this alongside" value={entry.taught_with} />
          <Field label="First mistake" value={entry.first_mistake} accent />
        </div>
      )}
    </div>
  );
}
