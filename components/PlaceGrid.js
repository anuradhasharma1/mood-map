"use client";

import PlaceCard from "./PlaceCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PlacesGrid({ places, searchQuery, selected, highlightedPlace }) {
  const { data: session } = useSession();
  const router = useRouter();

  //only login user can see
  const displayPlaces = selected
    ? session
      ? places
      : []
    : places.slice(0, 8);

  const subtext = searchQuery
    ? `${places.length} result${places.length !== 1 ? "s" : ""} for "${searchQuery}"`
    : selected
      ? session
        ? `Showing all ${places.length} places for ${selected} mood`
        : `Login to explore ${selected} places`
      : "Iconic destinations every traveller must experience";

  return (
    <div id="places-section">
      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100" />
          <h3
            style={{ color: "var(--text-primary)" }}
            className="text-2xl font-semibold whitespace-nowrap"
          >
            {selected ? `${selected} Places in India` : "Famous Places in India"}
          </h3>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
        <p className="text-center text-[#aaaaaa] text-sm mt-2">{subtext}</p>
      </div>

      {/* Grid / Login Prompt / Empty State */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        {selected && !session ? (
          //  Mood selected but not logged in → login prompt
          <div
            className="flex flex-col items-center gap-4 py-16 px-6 rounded-2xl border border-dashed border-gray-200 text-center"
            style={{ background: "var(--card-bg)" }}
          >
            <p className="text-4xl">🔐</p>
            <p
              className="font-semibold text-xl"
              style={{ color: "var(--text-primary)" }}
            >
              Login to explore {selected} places
            </p>
            <p className="text-sm text-[#aaaaaa] max-w-sm leading-relaxed">
              Create a free account to unlock mood-based filtering and discover
              25+ destinations across India
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-2 px-8 py-3 bg-[rgb(255,204,92)] text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
            >
              Login to explore →
            </button>
          </div>
        ) : displayPlaces.length > 0 ? (
          //  Show place cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayPlaces.map((place) => (
              <PlaceCard key={place.id} place={place}
                isHighlighted={place.name === highlightedPlace}
              />
            ))}
          </div>
        ) : (
          //  No search results
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <p className="text-4xl">🔍</p>
            <p className="text-gray-500 font-medium">
              No places found for{" "}
              <span className="font-semibold">&ldquo;{searchQuery}&rdquo;</span>
            </p>
            <p className="text-gray-400 text-sm">
              Try a different name, city, or mood
            </p>
          </div>
        )}
      </div>
    </div>
  );
}