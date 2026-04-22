import { GoogleGenAI } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY belum di-set di file .env');
}

export const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});