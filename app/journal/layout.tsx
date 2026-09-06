import type { Metadata } from "next";
import "./journal.css";
import { AuthProvider } from "@/lib/useAuth";

export const metadata: Metadata = {
  title: "Journals",
  description: "A running log of things worth writing down, by subject.",
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
