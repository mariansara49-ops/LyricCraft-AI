
import { GoogleGenAI } from "@google/genai";
import { Genre, Mood } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLyrics = async (topic: string, genre: Genre, mood: Mood): Promise<string> => {
  const systemInstruction = `You are a world-class songwriter. Your task is to write lyrics for a song.
The lyrics should have a clear structure, typically including verses, a chorus, and possibly a bridge and an outro.
The tone and style should perfectly match the requested genre and mood.
Do not include any introductory text like "Here are the lyrics" or any explanations. Only output the lyrics themselves, with labels for each section (e.g., [Verse 1], [Chorus]).`;

  const prompt = `Write lyrics for a ${genre} song about "${topic}". The mood of the song should be ${mood}.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating lyrics:", error);
    throw new Error("Failed to generate lyrics. Please try again.");
  }
};
