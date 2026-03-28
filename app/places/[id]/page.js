"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { famousPlaces } from "@/data/places";
import Image from "next/image";



export default function PlaceDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Find place from static data by id
  const place = famousPlaces.find((p) => p.id === parseInt(id));

  const [wikiData, setWikiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!place) return;

    const fetchWiki = async () => {
      try {
        // Wikipedia API — free, no key needed
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place.name)}`
        );
        const data = await res.json();
        setWikiData(data);
      } catch (err) {
        console.error("Wikipedia fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWiki();
  }, [place]);

  // Place not found in data
  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🗺️</p>
          <p className="text-gray-500 font-medium">Place not found</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-5 py-2 bg-[#00ccff] text-white rounded-xl text-sm cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer mb-6"
        >
          ← Back to explore
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16">
        {/* Hero image */}
        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-8">
          {place.image ? (
            <Image
              src={place.image}
              alt={place.name}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-8xl"
              style={{ background: place.colorBg }}
            >
              {place.emoji}
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Place name on image */}
          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {place.name}
            </h1>
            <p className="text-white/80 text-sm mt-1">
              📍 {place.city}, {place.state}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left — main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Type + Vibes badges */}
            <div className="flex flex-wrap gap-2">
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ background: place.colorBg, color: place.color }}
              >
                {place.type}
              </span>
              {place.vibes?.map((vibe) => (
                <span
                  key={vibe}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
                >
                  {vibe}
                </span>
              ))}
            </div>

            {/* Wikipedia description */}
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                About
              </h2>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-4/6" />
                </div>
              ) : (
                <p className="leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>
                  {wikiData?.extract || place.desc}
                </p>
              )}
            </div>

            {/* Wikipedia link */}
            {wikiData?.content_urls?.desktop?.page && (
              <a
                href={wikiData.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#00aacc] hover:underline"
              >
                Read more on Wikipedia →
              </a>
            )}
          </div>

          {/* Right — quick info card */}
          <div className="space-y-4">
            <div
              className="rounded-2xl p-5 border"
              style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
            >
              <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
                Quick Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-secondary)" }}>City</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>{place.city}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-secondary)" }}>State</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>{place.state}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-secondary)" }}>Type</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>{place.type}</span>
                </div>
                {wikiData?.description && (
                  <div className="flex justify-between">
                    <span style={{ color: "var(--text-secondary)" }}>Known as</span>
                    <span className="font-medium text-right max-w-32" style={{ color: "var(--text-primary)" }}>
                      {wikiData.description}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}