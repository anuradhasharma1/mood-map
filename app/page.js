"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { famousPlaces } from "@/data/places";
import { moods } from "@/data/moods";
import HeroSection from "@/components/HeroSection";
import MoodSelector from "@/components/MoodSelector";
import PlacesGrid from "@/components/PlaceGrid";

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")

  const [selected, setSelected] = useState(null);
  const filtered = famousPlaces.filter((place) => {
    const matchesMood = selected
      ? place.vibes?.some((v) =>
        moods.find((m) => m.label === selected)?.vibes.includes(v)
      )
      : true;

    const matchesSearch = searchQuery
      ? place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.state.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesMood && matchesSearch;
  });



  return (
    <main style={{ background: "var(--page-bg)" }} className="min-h-screen transition-colors duration-300">
      <HeroSection selected={selected} />
      <MoodSelector selected={selected} setSelected={setSelected} />
      <PlacesGrid places={filtered} searchQuery={searchQuery}  selected={selected} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}