import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, questionTypes, historyTitles } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    // Mapping difficulty to word count
    let wordCount = 500;
    if (difficulty === 'medium') wordCount = 700;
    if (difficulty === 'hard') wordCount = 900;

    let systemInstruction = `
You are an expert IELTS Reading test creator. Your task is to generate a realistic IELTS reading passage and accompanying questions.

Parameters for this generation:
- Topic: ${topic || 'Any academic topic (e.g., science, history, sociology)'}
- Difficulty: ${difficulty || 'medium'} (Easy ~500 words, Medium ~700 words, Hard ~900 words. Harder texts should have more complex vocabulary and sentence structures.)
- Desired Question Types: ${questionTypes ? questionTypes.join(', ') : 'Mixed (e.g., TFNG, multiple-choice, matching)'}
- History Titles (DO NOT USE THESE TOPICS): ${historyTitles ? historyTitles.join(' | ') : 'None'}

CRITICAL: Output ONLY valid JSON using the exact schema below. Do not include markdown tags or explanatory text.

{
  "id": "ai_generated_[random string]",
  "title": "Passage Title",
  "topic": "The broad topic category",
  "difficulty": "${difficulty || 'medium'}",
  "wordCount": [approximate word count],
  "passage": "The full text of the reading passage. Use standard paragraphing (\\n\\n). Ensure the vocabulary and style match IELTS academic reading standards.",
  "questions": [
    {
      "id": "q1",
      "type": "tfng|ynng|matching-headings|matching-info|sentence-completion|summary|multiple-choice|short-answer",
      "question": "The question text",
      "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"], // Only if multiple-choice or matching
      "correctAnswer": "The exact correct answer text",
      "explanation": "Why this answer is correct based on the passage.",
      "paragraphRef": "Paragraph X",
      "keywordHint": "Keywords to scan for"
    }
  ]
}

Constraints:
- Generate exactly 4-5 questions based on the requested types.
- Make sure the text is informative, academic, and well-structured.
- Ensure the questions accurately reflect standard IELTS question formats and difficulty.
- Do NOT generate a topic that is similar to the History Titles provided.
`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `Generate a new reading passage about ${topic} at ${difficulty} difficulty.` }] }],
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = result.response.text();
    const data = JSON.parse(responseText);
    
    // add unique id if model fails to do so properly
    data.id = `ai_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Generate Passage API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
