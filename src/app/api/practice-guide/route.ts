import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { prompt, taskType } = await req.json();

    if (!prompt || !taskType) {
      return NextResponse.json({ error: 'Prompt and taskType are required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    let systemInstruction = '';
    
    if (taskType === 'task1') {
      systemInstruction = `
You are an adaptive IELTS General Training Task 1 Assistant. Your job is to analyze a given IELTS letter prompt and generate a contextual "Guidance Package" to be displayed in a live sidebar while the user writes.

Instructions:
1. Analyze the input prompt to determine the Tone (Formal, Semi-formal, or Informal) and the main Purpose (e.g., Complaint, Request, Apology, Gratitude).
2. Generate a custom 4-5 paragraph structural skeleton checklist specific to the prompt's bullet points.
3. Select 4-6 appropriate linking words/cohesive devices that strictly match the required tone.
4. Provide a customized "Lexical Phrase Bank" containing 4-5 high-level phrases relevant to the specific situation (e.g., if it's a complaint letter, provide formal complaint phrases).

CRITICAL: Output ONLY valid JSON using the exact schema below. Do not include markdown tags or explanatory text.

{
  "determinedTone": "Formal / Semi-formal / Informal",
  "letterPurpose": "Main intent of the letter",
  "structuralSkeleton": [
    { "paragraph": 1, "focus": "Greeting & Statement of Purpose" },
    { "paragraph": 2, "focus": "Action for Bullet 1" },
    { "paragraph": 3, "focus": "Action for Bullet 2" },
    { "paragraph": 4, "focus": "Action for Bullet 3" },
    { "paragraph": 5, "focus": "Appropriate Closing & Sign-off" }
  ],
  "recommendedLinkers": [
    { "word": "Furthermore", "usage": "Adding information" }
  ],
  "phraseBank": [
    { "phrase": "I am writing to express my dissatisfaction with...", "context": "Starting the complaint" }
  ]
}
      `;
    } else {
      systemInstruction = `
You are an adaptive IELTS General Training Task 2 Assistant. Your job is to analyze a given IELTS essay prompt and generate a contextual "Guidance Package" to be displayed in a live sidebar while the user writes.

Instructions:
1. Analyze the input prompt to determine the Essay Type (e.g., Opinion, Advantages/Disadvantages, Causes/Solutions, Discussion).
2. Generate a custom 4-5 paragraph structural skeleton checklist specific to the prompt's question.
3. Select 4-6 appropriate linking words/cohesive devices that strictly match the essay structure (e.g., contrast linkers for discussion, cause/effect linkers for causes).
4. Provide a customized "Lexical Phrase Bank" containing 4-5 high-level phrases relevant to the specific topic and essay type.

CRITICAL: Output ONLY valid JSON using the exact schema below. Do not include markdown tags or explanatory text.

{
  "determinedTone": "Academic / Formal",
  "letterPurpose": "Essay Type (e.g., Opinion, Causes and Solutions)",
  "structuralSkeleton": [
    { "paragraph": 1, "focus": "Introduction: Hook & Thesis" },
    { "paragraph": 2, "focus": "Body 1: First main point" },
    { "paragraph": 3, "focus": "Body 2: Second main point" },
    { "paragraph": 4, "focus": "Conclusion: Summary & Final thought" }
  ],
  "recommendedLinkers": [
    { "word": "Consequently", "usage": "Showing result" }
  ],
  "phraseBank": [
    { "phrase": "It is widely believed that...", "context": "Introducing a common viewpoint" }
  ]
}
      `;
    }

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `Prompt to analyze:\n\n${prompt}` }] }],
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = result.response.text();
    const data = JSON.parse(responseText);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Practice Guide API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
