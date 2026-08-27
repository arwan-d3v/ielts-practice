import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { difficulty, topics } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    // difficulty: 1 (easy/intermediate) to 5 (expert)
    const levelStr = difficulty > 3 ? 'Band 7.5 - 8.5 (Expert)' : 'Band 6.0 - 7.0 (Intermediate to Advanced)';
    const topicsStr = topics && topics.length > 0 ? topics.join(', ') : 'Mixed Conditionals, Passive Voice, Inversion, Relative Clauses';

    const systemInstruction = `
You are an expert IELTS examiner generating an interactive grammar quiz for an IELTS student.
Generate a 3-question adaptive quiz based on the user's difficulty level: ${levelStr}.
Focus on these grammar topics: ${topicsStr}.

Types of questions you can generate:
1. "fix_mistake": Provide a sentence with a grammatical mistake, ask the user to fix it.
2. "fill_blank": Provide a sentence with a missing advanced grammatical structure, ask the user to fill it.

Output strictly in JSON matching this schema:
{
  "questions": [
    {
      "id": "q1",
      "type": "fix_mistake or fill_blank",
      "topic": "The grammar topic tested",
      "instruction": "e.g. Find and correct the grammatical error in this sentence.",
      "sentence": "The sentence with a mistake or a [BLANK]",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "The exact string of the correct option",
      "explanation": "Why this is correct and what the rule is"
    }
  ]
}
`;

    const promptText = `Generate a 3-question IELTS grammar quiz for difficulty level ${difficulty}/5. Make the options tricky but fair.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = result.response.text();
    const data = JSON.parse(responseText);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Generate Grammar Quiz API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
