import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnnotatedText } from '@/lib/annotated-data';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const historyStr = history && history.length > 0 ? history.join(', ') : 'None';

    const systemInstruction = `
You are an expert IELTS examiner (Band 9.0) and instructor. Your task is to write a cohesive, high-level IELTS Writing Task 2 body paragraph or a short article (around 100-150 words). 
You must also provide annotations (highlights) for key vocabulary, advanced grammar, and cohesive devices (connectors) within the text.
CRITICAL: Do NOT write about these topics which were already generated: ${historyStr}

Pick a completely new topic commonly found in IELTS (e.g., Space Exploration, Artificial Intelligence, Globalization, Traditional Culture, Urbanization, Diet & Health).

IMPORTANT: The "textToHighlight" MUST be an exact substring of the full text in the paragraph.

Output strictly in JSON matching this schema:
{
  "topic": "The general IELTS topic chosen",
  "title": "A catchy title for this passage",
  "difficulty": "Band 8.0" or "Band 9.0",
  "paragraphs": [
    {
      "text": "The full text of the paragraph...",
      "annotations": [
        {
          "textToHighlight": "exact string to highlight from the text",
          "type": "vocab" or "grammar" or "connector",
          "meaning": "Meaning / Function in Indonesian",
          "formulaOrUsage": "Abstract formula or structural usage",
          "tips": "Usage tip for IELTS exam"
        }
      ]
    }
  ]
}
`;

    const promptText = `Generate a new Band 8.0/9.0 annotated passage. Make sure there are at least 5-7 annotations covering a mix of vocab, grammar, and connectors.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = result.response.text();
    const data = JSON.parse(responseText);

    // Add unique IDs
    const newId = `ai-anno-${Date.now()}`;
    data.id = newId;
    data.generatedAt = new Date().toISOString();
    
    let annoCounter = 1;
    data.paragraphs.forEach((p: any) => {
      p.annotations.forEach((a: any) => {
        a.id = `${newId}-a${annoCounter++}`;
      });
    });

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Generate Annotated Text API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
