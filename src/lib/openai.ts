import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private'; // Import server-side env variables

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

export async function interpretDreamWithMood(dreamContent: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable dream interpreter. Provide brief interpretations focusing on key symbols and psychology. Avoid lengthy explanations or mystical elements."
        },
        {
          role: "user",
          content: `Please interpret this dream concisely: ${dreamContent}`
        }
      ],
      model: "grok-beta",
    });

    // Safely extract interpretation
    const interpretation = completion?.choices?.[0]?.message?.content?.trim() || 'No interpretation available.';

    const moodPrompt = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert in emotional analysis based on textual content. Provide a single-word mood description from the following text."
        },
        {
          role: "user",
          content: `Dream text: ${dreamContent}`
        }
      ],
      model: "grok-beta",
    });

    // Safely extract mood
    const mood = moodPrompt?.choices?.[0]?.message?.content?.trim() || 'Unknown mood';

    return { interpretation, mood };
  } catch (error) {
    console.error('Error interpreting dream and detecting mood:', error);
    throw new Error('Failed to interpret dream and detect mood.');
  }
}

