import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ VITE_GEMINI_API_KEY tidak ditemukan. App tetap berjalan tanpa Gemini API.");
}

export const genAI = apiKey ? new GoogleGenerativeAI({ apiKey }) : null;

export async function generateBrief(prompt: string) {
  try {
    if (!genAI) {
      return "Gemini API belum diatur. Tambahkan API key di Environment Variables (Vercel Settings).";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("❌ Error generateBrief:", err);
    return "Terjadi kesalahan saat menghubungkan ke Gemini API.";
  }
}
