import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Ambil API key dari environment variable Vite.
 * Prefix VITE_ wajib agar bisa dibaca di browser saat build.
 */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Validasi kunci
if (!apiKey) {
  console.error("❌ Environment variable VITE_GEMINI_API_KEY tidak ditemukan.");
}

/**
 * Buat instance Gemini AI hanya jika apiKey tersedia.
 * Kalau tidak, buat dummy object agar tidak menyebabkan crash/blank screen.
 */
export const genAI = apiKey
  ? new GoogleGenerativeAI({ apiKey })
  : null;

/**
 * Fungsi umum untuk generate teks dari prompt
 * (gunakan sesuai kebutuhan aplikasi kamu)
 */
export async function generateBrief(prompt: string) {
  try {
    if (!genAI) {
      throw new Error("Missing Gemini API key. Please set VITE_GEMINI_API_KEY.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text;
  } catch (error) {
    console.error("❌ Error generateBrief:", error);
    return "Terjadi kesalahan saat menghubungkan ke Gemini API.";
  }
}
