"use client"
import { useState } from "react"
import Image from "next/image"


const moods = [
  { label: "Calm", emoji: "🌿", bg: "#e8faf4", pillBg: "#1D9E75", tagBg: "#c8f5e6", tagBorder: "#9FE1CB", tagText: "#0F6E56", heading: "#1D9E75" },
  { label: "Happy", emoji: "☀️", bg: "#fffbea", pillBg: "#EF9F27", tagBg: "#fff3cc", tagBorder: "#FAC775", tagText: "#7a4f00", heading: "#e69000" },
  { label: "Adventure", emoji: "🧭", bg: "#fff4f0", pillBg: "#D85A30", tagBg: "#fde8df", tagBorder: "#f0997b", tagText: "#7a2800", heading: "#D85A30" },
  { label: "Romantic", emoji: "🌸", bg: "#fff0f5", pillBg: "#D4537E", tagBg: "#fce4ee", tagBorder: "#ED93B1", tagText: "#7a1a3e", heading: "#D4537E" },
  { label: "Work Aesthetic", emoji: "📚", bg: "#eef5ff", pillBg: "#378ADD", tagBg: "#dceeff", tagBorder: "#85B7EB", tagText: "#0C447C", heading: "#378ADD" },
  { label: "Social", emoji: "🎉", bg: "#f3f0ff", pillBg: "#7F77DD", tagBg: "#e8e4ff", tagBorder: "#AFA9EC", tagText: "#3C3489", heading: "#7F77DD" },
]

const famousPlaces = [
  { id: 1, name: "Taj Mahal", city: "Agra", state: "Uttar Pradesh", type: "Monument", image: "/tajmahal.jpg", color: "#D4537E", colorBg: "#FBEAF0", desc: "One of the Seven Wonders of the World" },
  { id: 2, name: "Amber Fort", city: "Jaipur", state: "Rajasthan", type: "Fort", image: "/amber fort.jpg", color: "#D85A30", colorBg: "#FAECE7", desc: "Majestic hilltop fort with stunning architecture" },
  { id: 3, name: "Kerala Backwaters", city: "Alleppey", state: "Kerala", type: "Nature", image: "/kerela-backwaters.jpg", color: "#1D9E75", colorBg: "#E1F5EE", desc: "Serene network of lagoons and lakes" },
  { id: 4, name: "Varanasi Ghats", city: "Varanasi", state: "Uttar Pradesh", type: "Culture", image: "/varanasi.jpg", color: "#EF9F27", colorBg: "#FAEEDA", desc: "Ancient spiritual city on the Ganges" },
  { id: 5, name: "Nalanda University Ruins", city: "Nalanda", state: "Bihar", type: "History", image: "/nalanda.jpg", color: "#D97706", colorBg: "#FEF3C7", desc: "Ancient center of learning and one of the world's first universities" },
  { id: 6, name: "Rann of Kutch", city: "Kutch", state: "Gujarat", type: "Nature", image: "/kutch.jpg", color: "#378ADD", colorBg: "#E6F1FB", desc: "World's largest salt flat under moonlight" },
  { id: 7, name: "Hampi Ruins", city: "Hampi", state: "Karnataka", type: "Heritage", image: "/hampi.jpg", color: "#D85A30", colorBg: "#FAECE7", desc: "Surreal boulder landscape with ancient temples" },
  { id: 8, name: "Ladakh Valley", city: "Leh", state: "Ladakh", type: "Adventure", image: "/leh.jpg", color: "#1D9E75", colorBg: "#E1F5EE", desc: "High-altitude desert with breathtaking passes" },
]

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