"use client";

import { famousPlaces } from "@/data/places";
import { moods } from "@/data/moods";
import PlaceCard from "./PlaceCard";


export default function PlacesGrid({ selected }) {
  const activeMood = moods.find((m) => m.label === selected);

  const filtered = activeMood
    ? famousPlaces.filter((place) =>
        place.vibes?.some((v) => activeMood.vibes.includes(v))
      )
    : famousPlaces;

  return (
    <div id="places-section">
      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100" />
          <h3 className="text-2xl font-semibold whitespace-nowrap">
            {activeMood
              ? `${activeMood.emoji} ${selected} Places in India`
              : "Famous Places in India"}
          </h3>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
        <p className="text-center text-[#aaaaaa] text-sm mt-2">
          {activeMood
            ? `Showing places that match your ${selected} mood`
            : "Iconic destinations every traveller must experience"}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-12">
            No places found for this mood yet. Try another!
          </p>
        )}
      </div>
    </div>
  );
}