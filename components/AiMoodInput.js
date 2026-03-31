"use client";

import { useState } from "react";
import { getMoodSuggestion } from "@/app/actions/getMoodSuggestion";

export default function AIMoodInput() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [suggestion, setSuggestion] = useState(null);
    const [loading, setLoading] = useState(false);


    async function handleSubmit() {
        if (!input.trim()) return;
        setLoading(true);
        try {
            const result = await getMoodSuggestion(input);
            setSuggestion(result);
        } catch (err) {
            console.error("AI error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "var(--nav-bg)",
                    border: "2px solid var(--nav-border)",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,255,255,0.3)",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "bounce 2s infinite",  // ← bouncing animation
                    fontSize: "28px",
                }}
                title="AI Travel Assistant"
            >
                {isOpen ? "✖️" : "🧚‍♀️"}
            </button>

            {/* Popup */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "90px",
                        right: "24px",
                        width: "300px",
                        background: "var(--card-bg)",
                        borderRadius: "16px",
                        padding: "20px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        zIndex: 999,
                        border: "1px solid var(--card-border)",
                    }}
                >
                    {/* Header */}
                    <p style={{
                        color: "#00ffff",
                        marginBottom: "8px",
                        fontSize: "13px",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                    }}>
                        ✨ AI Travel Assistant
                    </p>

                    {/* Greeting */}
                    {!suggestion && (
                        <p style={{
                            color: "var(--text-primary)",
                            marginBottom: "12px",
                            fontSize: "14px",
                            lineHeight: "1.5",
                        }}>
                            Hi! How may I help you today? 😊
                            <br />
                            <span style={{
                                fontSize: "12px",
                                color: "var(--text-secondary)",
                            }}>
                                Tell me how you're feeling...
                            </span>
                        </p>
                    )}

                    {/* Input */}
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        placeholder="e.g...so tired today want to go somewhere peaceful..."
                        rows={3}
                        style={{
                            width: "100%",
                            background: "var(--page-bg)",
                            border: "1px solid var(--card-border)",
                            borderRadius: "8px",
                            padding: "10px",
                            color: "var(--text-primary)",
                            fontSize: "13px",
                            resize: "none",
                            outline: "none",
                            boxSizing: "border-box",
                            fontFamily: "inherit",
                        }}
                    />


                    {/*submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: "100%",
                            marginTop: "10px",
                            padding: "10px",
                            background: loading ? "var(--card-border)" :  "#00ffff",
                            color: loading ? "var(--text-secondary)" : "#0f172a",
                            border: "none",
                            borderRadius: "8px",
                            cursor: loading ? "not-allowed" : "pointer",
                            fontSize: "14px",
                            fontWeight: "600",
                            transition: "opacity 0.2s",
                        }}
                    >
                        {loading ? "Thinking... 🔮" : "Find My Place ✨"}
                    </button>

                    {/* Suggestion Result */}
                    {suggestion && (
                        <div style={{
                            marginTop: "14px",
                            padding: "12px",
                            background: "var(--card-border)",  
                            borderRadius: "10px",
                            border: "1px solid var(--card-border)",
                        }}>
                            <h4 style={{
                                color: "var(--text-primary)", 
                                margin: "0 0 6px",
                                fontSize: "15px",
                            }}></h4>
                            <p style={{
                                color: "var(--text-primary)",
                                fontSize: "12px",
                                margin: "0 0 8px",
                                lineHeight: "1.6",
                            }}>
                                {suggestion.reason}
                            </p>
                            <span style={{
                                background: "var(--nav-border)",
                                color: "var(--text-primary)",
                                padding: "3px 10px",
                                borderRadius: "20px",
                                fontSize: "11px",
                            }}>
                                #{suggestion.mood_tag}
                            </span>


                            {/* Reset button — try new mood */}
                            <button
                                onClick={() => { setSuggestion(null); setInput(""); }}
                                style={{
                                    display: "block",
                                    marginTop: "10px",
                                    background: "transparent",
                                    border: "none",
                                    color: "var(--nav-bg)",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    padding: 0,
                                    fontWeight: "500",
                                }}
                            >
                                ↩ Try again
                            </button>
                        </div>
                    )}
                </div>
            )}

        </>
    )
}