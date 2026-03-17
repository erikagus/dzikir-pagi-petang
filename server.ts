import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  app.post("/api/extract", async (req, res) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const text = fs.readFileSync('dzikir_fixed.txt', 'utf8');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: `Extract all Dzikir Pagi and Petang items from the following text.
        
        The text is parsed from a PDF. It contains transliteration, translation, and how many times it should be read.
        The Arabic text in the PDF is broken, so please reconstruct the correct Arabic text based on the transliteration and translation.
        
        Return a JSON array of objects with the following structure:
        - id: string (e.g. 'ayat-kursi', 'al-ikhlas', 'pagi-1', 'petang-1')
        - title: string (e.g. 'Ayat Kursi', 'Surat Al-Ikhlas', 'Dzikir Pagi I', 'Dzikir Petang I')
        - arabic: string (the correct Arabic text)
        - transliteration: string (the Latin transliteration)
        - translation: string (the Indonesian translation)
        - target: number (how many times it should be read, e.g. 1, 3, 10, 100)
        - type: string ('pagi', 'petang', or 'both' if it appears in both sections or is generally for both)
        
        Make sure to extract ALL dzikir items mentioned in the text.
        
        Text:
        ${text}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                arabic: { type: Type.STRING },
                transliteration: { type: Type.STRING },
                translation: { type: Type.STRING },
                target: { type: Type.INTEGER },
                type: { type: Type.STRING, description: "'pagi', 'petang', or 'both'" }
              },
              required: ['id', 'title', 'arabic', 'transliteration', 'translation', 'target', 'type']
            }
          }
        }
      });

      fs.writeFileSync('dzikir_data.json', response.text || '[]');
      res.json({ success: true, data: JSON.parse(response.text || '[]') });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
