import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { section, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    }

    if (!section || !['vocabulary', 'connectors', 'formulas', 'phrases', 'grammar'].includes(section)) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    let systemInstruction = '';
    let promptText = '';

    const historyStr = history && history.length > 0 ? history.join(', ') : 'None';

    if (section === 'vocabulary') {
      systemInstruction = `
You are an expert IELTS examiner and vocabulary instructor. Generate 5 highly useful Band 7.0+ vocabulary words.
CRITICAL: Do NOT generate any words from this history list: ${historyStr}
Pick a completely new topic that isn't typically covered in standard lists.

Output strictly in JSON matching this schema:
{
  "topic": "The general topic of these words (e.g., Corporate Life, Psychology)",
  "words": [
    {
      "word": "word",
      "definition": "English definition",
      "definitionId": "Indonesian translation of definition",
      "partOfSpeech": "noun/verb/adjective/adverb",
      "exampleFormal": "Formal academic example",
      "exampleInformal": "Informal daily use example",
      "synonyms": ["syn1", "syn2"],
      "antonyms": ["ant1", "ant2"],
      "collocations": ["collocation1", "collocation2"],
      "phraseUsage": "A higher band phrase using this word",
      "dailySentence": "A sentence for daily use",
      "commonMistake": "Optional: a common mistake students make with this word (or empty string)"
    }
  ]
}
`;
      promptText = `Generate 5 new IELTS vocabulary words. Exclude: ${historyStr}`;
    } 
    else if (section === 'connectors') {
      systemInstruction = `
You are an expert IELTS examiner. Generate 4 advanced linking words/connectors for Band 7.0+.
CRITICAL: Do NOT generate any connectors from this history list: ${historyStr}

Output strictly in JSON matching this schema:
{
  "groupFunction": "The function (e.g., Conceding a point, Emphasizing)",
  "groupDescription": "Description of when to use these connectors",
  "connectors": [
    {
      "word": "The connector",
      "level": "Band 7.0 / 8.0",
      "isForWriting": true/false,
      "isForSpeaking": true/false,
      "usage": "How and when to use it",
      "exampleWriting": "Writing task example (or empty if not for writing)",
      "exampleSpeaking": "Speaking task example (or empty if not for speaking)",
      "commonMistake": "Optional common mistake"
    }
  ]
}
`;
      promptText = `Generate 4 new IELTS connectors. Exclude: ${historyStr}`;
    }
    else if (section === 'formulas') {
      systemInstruction = `
You are an expert IELTS examiner. Generate 3 advanced sentence formulas for Band 7.0+.
CRITICAL: Do NOT generate any formulas with names similar to these in the history list: ${historyStr}

Output strictly in JSON matching this schema:
{
  "formulas": [
    {
      "name": "Name of formula (e.g., The 'Not Only... But Also' Structure)",
      "category": "e.g., contrast, addition, cause-effect",
      "bandLevel": "Band 7.0+",
      "skill": "Writing Task 2 / Speaking Part 3",
      "formula": "The abstract template with brackets, e.g. Not only [Subject] [Verb], but [Subject] also [Verb]",
      "filledExample": "A complete example sentence",
      "formalVersion": "A highly formal application",
      "informalVersion": "A slightly less formal application (for Speaking)",
      "whenToUse": "Explanation of the best context to use this"
    }
  ]
}
`;
      promptText = `Generate 3 new IELTS sentence formulas. Exclude: ${historyStr}`;
    }
    else if (section === 'phrases') {
      systemInstruction = `
You are an expert IELTS examiner. Generate 4 advanced idiomatic or academic phrases for Band 7.0+.
CRITICAL: Do NOT generate any phrases from this history list: ${historyStr}

Output strictly in JSON matching this schema:
{
  "phrases": [
    {
      "phrase": "The phrase itself",
      "section": "e.g., Speaking Part 2, Writing Task 2",
      "skill": "Speaking / Writing",
      "bandLevel": "Band 7.0+",
      "meaning": "English meaning",
      "meaningId": "Indonesian meaning",
      "exampleInContext": "A full example sentence",
      "alternatives": ["alternative1", "alternative2"],
      "register": "Formal or Informal or Neutral"
    }
  ]
}
`;
      promptText = `Generate 4 new IELTS phrases. Exclude: ${historyStr}`;
    }
    else if (section === 'grammar') {
      systemInstruction = `
You are an expert IELTS examiner and grammar instructor. Generate 2 useful IELTS grammar structures or rules for Band 7.0+ (can be fundamental or advanced).
CRITICAL: Do NOT generate any topics similar to these in the history list: ${historyStr}

Output strictly in JSON matching this schema:
{
  "grammar": [
    {
      "topic": "The topic of the grammar rule (e.g., Mixed Conditionals, Passive Voice, Inversion)",
      "difficulty": "Fundamental / Intermediate / Advanced / Expert",
      "description": "Clear explanation of the rule in Indonesian",
      "formula": "The abstract formula structure",
      "formulaTip": "A tip on how and when to use this naturally in the exam",
      "examples": [
        {
          "band7": "A high-level Band 7.0+ example sentence using the rule",
          "commonMistake": "Optional: How lower-band students usually misuse it (or empty string)"
        }
      ]
    }
  ]
}
`;
      promptText = `Generate 2 advanced IELTS grammar rules. Exclude topics: ${historyStr}`;
    }

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
    console.error('Generate Bank API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
