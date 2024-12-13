import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private'; // Import server-side env variables

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function interpretDream(dreamContent: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable dream interpreter. Analyze dreams and provide meaningful interpretations based on common dream symbols, psychology, and cultural contexts. Be insightful but avoid overly mystical interpretations."
        },
        {
          role: "user",
          content: `Please interpret this dream: ${dreamContent}`
        }
      ],
      model: "gpt-4-turbo-preview",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error interpreting dream:', error);
    throw error;
  }
}