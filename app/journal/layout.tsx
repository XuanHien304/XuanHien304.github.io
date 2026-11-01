import type { Metadata } from "next";
import "./journal.css";
import { AuthProvider } from "@/lib/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Journals",
  description: "A running log of things worth writing down, by subject.",
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  );
}
