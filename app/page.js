"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import MoodSelector from "@/components/MoodSelector";
import PlacesGrid from "@/components/PlaceGrid";

export default function Home() {
  const [selected, setSelected] = useState(null);

  return (
    <main>
      <HeroSection selected={selected} />
      <MoodSelector selected={selected} setSelected={setSelected} />
      <PlacesGrid selected={selected} />
    </main>
  );
}