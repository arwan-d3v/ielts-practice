import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { date, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    let systemInstruction = `
You are an expert IELTS examiner and vocabulary instructor. Your task is to generate a daily vocabulary drill package for a student aiming for Band 7.0+.

The user will provide the current date and potentially a history of words they have already learned (to avoid repetition).
You must generate exactly 10 unique items: 4 vocabulary words, 3 useful phrases, and 3 model sentences.

CRITICAL: Output ONLY valid JSON using the exact schema below. Do not include markdown tags, comments, or explanatory text.

{
  "date": "YYYY-MM-DD (use the date provided)",
  "words": [
    {
      "word": "word",
      "definition": "English definition",
      "definitionId": "Indonesian translation of definition",
      "partOfSpeech": "noun/verb/adjective/adverb",
      "exampleFormal": "Formal academic example",
      "exampleInformal": "Informal daily use example",
      "synonyms": ["synonym1", "synonym2"],
      "antonyms": ["antonym1", "antonym2"],
      "topic": "Broad topic (e.g., Environment, Technology)"
    }
  ],
  "phrases": [
    {
      "phrase": "phrase",
      "meaning": "English meaning",
      "meaningId": "Indonesian meaning",
      "formalContext": "How to use in formal writing/speaking",
      "informalContext": "How to use in informal conversation"
    }
  ],
  "sentences": [
    {
      "sentence": "The model sentence",
      "translation": "Indonesian translation",
      "purpose": "What the sentence achieves (e.g., Expressing a strong opinion, Conceding a point)",
      "level": "Band 7.0"
    }
  ]
}

Constraints:
- Ensure the words are advanced (C1/C2 level) and highly useful for IELTS.
- The 4 words must be from different topics.
- DO NOT use any words from this history list if provided: ${history ? history.join(', ') : 'None'}.
`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `Generate daily vocab for date: ${date || new Date().toISOString().split('T')[0]}. History words to avoid: ${history ? history.join(', ') : 'None'}` }] }],
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = result.response.text();
    const data = JSON.parse(responseText);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Daily Vocab API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
