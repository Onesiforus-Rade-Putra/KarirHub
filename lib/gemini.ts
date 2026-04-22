import { GoogleGenAI } from '@google/genai';

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY belum di-set.');
  }

  return new GoogleGenAI({ apiKey });
}