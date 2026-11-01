import { trips } from "@/content/travel";
import { JournalHeader } from "@/components/journal/JournalHeader";
import { TripCard } from "@/components/travel/TripCard";

export default function TravelJournalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-12 pt-16">
      <JournalHeader
        title="Travel"
        description="Living in the UK, and the trips out from here."
        back={{ href: "/journal/", label: "All journals" }}
      />
      <ul className="mt-12 grid gap-10">
        {trips.map((trip) => (
          <li key={trip.id}>
            <TripCard trip={trip} />
          </li>
        ))}
      </ul>
    </div>
  );
}
