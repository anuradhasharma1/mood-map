"use client";
import { moods } from "@/data/moods";

export default function HeroSection({ selected }) {
    const activeMood = moods.find((m) => m.label === selected);

    return (
        <>
            {/* Tag */}
            <div className="flex items-center justify-center pt-16 md:pt-16 pb-4 md:pb-6 px-4">
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
                    India has a place for every mood. From aesthetic cafes to historic
                    monuments — discover yours.
                </p>
                <span className="text-[#999999] font-bold text-sm">
                    How are you feeling today?
                </span>
            </div>
        </>
    );
}