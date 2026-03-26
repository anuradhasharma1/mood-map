"use client";

import PlaceCard from "./PlaceCard";


export default function PlacesGrid({ places, searchQuery }) {

  const subtext = searchQuery
    ? `${places.length} result${places.length !== 1 ? "s" : ""} for "${searchQuery}"`
    : "Iconic destinations every traveller must experience";

  return (
    <div id="places-section">
      <div className="max-w-6xl mx-auto px-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100" />
          <h3 className="text-2xl font-semibold whitespace-nowrap">
            Famous Places in India
          </h3>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
        <p className="text-center text-[#aaaaaa] text-sm mt-2">{subtext}</p>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-16">
        {places.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <p className="text-4xl">🔍</p>
            <p className="text-gray-500 font-medium">
              No places found for <span className="font-semibold">"{searchQuery}"</span>
            </p>
            <p className="text-gray-400 text-sm">Try a different name, city, or mood</p>
          </div>
        )}
      </div>
    </div>
  );
}