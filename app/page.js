"use client"
import { useState } from "react"
import Image from "next/image"
import { moods } from "@/data/moods";
import { famousPlaces } from "@/data/places";


export default function Home() {
  const [selected, setSelected] = useState(null)

  const activeMood = moods.find((m) => m.label === selected)

  return (
    <main
      className="min-h-screen transition-colors duration-700"
      style={{ background: activeMood ? activeMood.bg : "#ffffff" }}
    >

      {/* Tag pill */}
      <div className="flex items-center justify-center pt-16 pb-6 px-4">
        <p
          className="px-4 py-2 border rounded-full text-base text-center transition-colors duration-500"
          style={{
            background: activeMood ? activeMood.tagBg : "#cffefe",
            borderColor: activeMood ? activeMood.tagBorder : "#00ccff",
            color: activeMood ? activeMood.tagText : "#00aacc",
          }}
        >
          Pick Your Mood, We will Handle The Main Character{" "}
          <span className="font-semibold cursor-pointer">Locations ✨</span>
        </p>
      </div>

      {/* Heading */}
      <h2
        className="text-5xl font-semibold text-center tracking-tight px-4 transition-colors duration-500"
        style={{ color: activeMood ? activeMood.heading : "#fcd12a" }}
      >
        Feel Like Exploring?
      </h2>

      {/* Subtext */}
      <div className="flex flex-col items-center gap-3 py-6 px-4">
        <p className="text-[#999999] text-center max-w-md leading-relaxed">
          India has a place for every mood.
          From aesthetic cafes to historic monuments — discover yours.
        </p>
        <span className="text-[#999999] font-bold text-sm">How are you feeling today?</span>
      </div>

      {/* Mood Pills */}
      <div className="flex flex-wrap gap-3 items-center justify-center px-6 pb-8">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelected(selected === mood.label ? null : mood.label)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer"
            style={{
              background: selected === mood.label ? mood.pillBg : "white",
              color: selected === mood.label ? "white" : "#555",
              borderColor: selected === mood.label ? mood.pillBg : "#e5e7eb",
              boxShadow: selected === mood.label ? `0 4px 16px ${mood.pillBg}55` : "none",
              transform: selected === mood.label ? "translateY(-2px)" : "",
            }}
          >
            <span>{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center pb-12">
        <button
          disabled={!selected}
          className="text-white px-8 py-3 rounded-xl font-medium text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          style={{
            background: activeMood ? activeMood.pillBg : "#FFD54F",
            boxShadow: activeMood ? `0 4px 20px ${activeMood.pillBg}55` : "none",
          }}
        >
          {selected ? `Explore ${selected} places →` : "Select a mood first"}
        </button>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100" />
          <h3
            className="text-2xl font-semibold whitespace-nowrap transition-colors duration-500"

          >
            Famous Places in India
          </h3>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
        <p className="text-center text-[#aaaaaa] text-sm mt-2">
          Iconic destinations every traveller must experience
        </p>
      </div>

      {/* Famous Places Grid */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {famousPlaces.map((place) => (
            <div
              key={place.id}
              className="rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                background: "white",
                borderColor: "#f0f0f0",
              }}
            >
              {/* Card image area */}

              <div className="h-28 overflow-hidden relative">
                {place.image ? (
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-5xl"
                    style={{ background: place.colorBg }}
                  >
                    {place.emoji}
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-4">
                <p className="font-semibold text-gray-800 text-sm mb-0.5">{place.name}</p>
                <p className="text-xs text-gray-400 mb-2">📍 {place.city}, {place.state}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{place.desc}</p>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: place.colorBg, color: place.color }}
                >
                  {place.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}