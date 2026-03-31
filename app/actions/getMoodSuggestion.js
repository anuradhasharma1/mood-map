"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { famousPlaces } from "@/data/places";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getMoodSuggestion(userInput) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const destinationNames = famousPlaces.map(d => d.name).join(", ");

    const prompt = `
You are a compassionate travel advisor of India.
A user describes their current mood : "${userInput}"

You MUST suggest ONLY from this list : ${destinationNames}
Respond Only in this JSON format ,nthng else :
{
"destination": "exact name from the list above",
      "reason": "2 sentence emotional explanation",
      "mood_tag": "one word like peaceful/adventurous/spiritual",
      "best_for": "type of traveler this suits"
}

`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
}