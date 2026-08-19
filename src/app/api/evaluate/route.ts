import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { buildPrompt } from '@/lib/prompts';
import { EvaluationRequest } from '@/lib/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const body: EvaluationRequest = await req.json();
    const { essay, taskType, question, language } = body;

    if (!essay || essay.trim().length === 0) {
      return NextResponse.json(
        { error: 'Essay is required.' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(essay, taskType, question, language);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    let result;
    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
      try {
        result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        });
        break; // Success
      } catch (error: any) {
        if (error.message && error.message.includes('503') && retries > 1) {
          retries--;
          console.log(`API overloaded (503). Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          throw error; // Rethrow if not a 503 or out of retries
        }
      }
    }
    
    if (!result) {
        throw new Error("Failed to get a response from the API after retries.");
    }

    let responseText = result.response.text();
    
    // Strip markdown formatting if Gemini includes it
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const evaluationData = JSON.parse(responseText);
      return NextResponse.json(evaluationData);
    } catch (parseError: any) {
      console.error('Failed to parse JSON:', responseText);
      return NextResponse.json(
        { error: 'Failed to parse AI response. ' + parseError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in evaluate API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to evaluate essay. Please try again.' },
      { status: 500 }
    );
  }
}
