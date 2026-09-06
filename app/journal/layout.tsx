import type { Metadata } from "next";
import "./journal.css";
import { AuthProvider } from "@/lib/useAuth";

export const metadata: Metadata = {
  title: "Learning Journal",
  description: "A running log of what I'm learning, by subject.",
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
