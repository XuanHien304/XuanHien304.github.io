import { JournalHeader } from "@/components/journal/JournalHeader";
import { Highlights, Signatures } from "@/components/play/Play";

export default function GameJournalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-12 pt-16">
      <JournalHeader
        title="Game & Sports"
        description="What I play, on screen and on the pitch, plus a few highlights."
        back={{ href: "/journal/", label: "All journals" }}
      />
      <div className="mt-12 grid gap-14">
        <Signatures />
        <Highlights />
      </div>
    </div>
  );
}
