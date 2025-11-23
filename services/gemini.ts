import { GoogleGenAI } from "@google/genai";
import { PunkAttributes } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generatePunkBio = async (id: number, attributes: PunkAttributes): Promise<string> => {
  if (!apiKey) return "AI Bio Unavailable (Missing API Key)";

  try {
    const prompt = `
      Write a very short, edgy, cyberpunk-style biography (max 25 words) for an NFT character (Punk #${id}) with the following visual traits:
      - Skin: ${attributes.skin}
      - Eyes: ${attributes.eyes}
      - Mouth: ${attributes.mouth}
      - Accessory: ${attributes.accessory}
      - Hair: ${attributes.hair}
      
      Do not describe the traits directly, but weave them into a personality or micro-story.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "A mysterious punk from the digital void.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Data corrupted. Bio unavailable.";
  }
};
