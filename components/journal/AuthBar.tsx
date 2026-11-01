"use client";

import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/lib/useAuth";

export function AuthBar() {
  const { user, isOwner, loading, signInWithGithub, signOut } = useAuth();

  if (loading) return <div style={{ height: 32 }} />;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {user ? (
        <>
          <span className="mono" style={{ fontSize: 11, color: "var(--jn-muted)" }}>
            {isOwner ? "Signed in as owner" : `Signed in as ${user.email ?? user.id.slice(0, 8)}`}
          </span>
          <button
            onClick={() => signOut()}
            style={{
              border: "1px solid var(--jn-border)",
              background: "transparent",
              borderRadius: 0,
              padding: "6px 10px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={() => signInWithGithub()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: "1px solid var(--jn-border)",
            background: "var(--jn-card)",
            borderRadius: 0,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <FaGithub size={13} /> Sign in
        </button>
      )}
    </div>
  );
}
