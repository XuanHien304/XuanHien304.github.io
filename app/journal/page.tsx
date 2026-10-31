import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const AREAS = [
  {
    slug: "study",
    name: "Study Journal",
    description: "DSA patterns and other things I'm learning, written up as I go.",
  },
  {
    slug: "travel",
    name: "Travel",
    description: "Places I've been, what happened, what I'd do differently.",
  },
  {
    slug: "game",
    name: "Game",
    description: "What I've played and what stood out.",
  },
];

const COMING_SOON = ["Study Abroad", "Sports"];

export default function JournalHubPage() {
  return (
    <div className="journal-root">
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 64px" }}>
        <Link
          href="/"
          className="mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            color: "var(--jn-muted)",
            textDecoration: "none",
            marginBottom: 20,
          }}
        >
          <FiArrowLeft size={12} /> Back to portfolio
        </Link>

        <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>Journals</h1>
        <p className="mono" style={{ fontSize: 12, color: "var(--jn-muted)", margin: "6px 0 0" }}>
          a running record, by subject
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/journal/${area.slug}/`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                textDecoration: "none",
                color: "var(--jn-ink)",
                background: "var(--jn-card)",
                border: "1px solid var(--jn-border)",
                borderRadius: 4,
                padding: "18px 20px",
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{area.name}</div>
                <div style={{ fontSize: 13, color: "var(--jn-muted)", marginTop: 3 }}>{area.description}</div>
              </div>
              <FiArrowRight size={16} style={{ color: "var(--jn-placeholder)", flexShrink: 0 }} />
            </Link>
          ))}

          {COMING_SOON.map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                background: "transparent",
                border: "1px dashed var(--jn-border)",
                borderRadius: 4,
                padding: "18px 20px",
                color: "var(--jn-placeholder)",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 500 }}>{name}</div>
              <span className="mono" style={{ fontSize: 11 }}>
                coming soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
