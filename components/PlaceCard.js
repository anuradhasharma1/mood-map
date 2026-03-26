"use client";

import Image from "next/image";

export default function PlaceCard({ place }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{
        background: "white",
        borderColor: "#f0f0f0",
      }}
    >
      {/* Image */}
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

      {/* Body */}
      <div className="p-4">
        <p className="font-semibold text-gray-800 text-sm mb-0.5">
          {place.name}
        </p>
        <p className="text-xs text-gray-400 mb-2">
          📍 {place.city}, {place.state}
        </p>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          {place.desc}
        </p>

        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: place.colorBg, color: place.color }}
        >
          {place.type}
        </span>
      </div>
    </div>
  );
}