"use client"
import { useState } from "react";
import { moods } from "@/data/moods";

export default function MoodSelector() {
    const [selected, setSelected] = useState(null);

    const activeMood = moods.find((m) => m.label === selected);

    return (
        <>
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
            {/*button*/}
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
        </>
    )
}