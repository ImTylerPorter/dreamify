import { db } from '$lib/db'; // Ensure this points to your Drizzle setup
import { dreamsTable } from '$lib/db/schema'; // The Drizzle schema for the 'dreams' table
import { eq } from 'drizzle-orm';
import type { Dream } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit'; // Import the type for event

export async function handleAddDream(dream: Dream): Promise<Dream> {
  try {
    const existingDream = await db
      .select()
      .from(dreamsTable)
      .where(eq(dreamsTable.title, dream.title))
      .limit(1);

    let savedDream;

    if (existingDream.length > 0) {
      const [dreamToUpdate] = existingDream;
      await db
        .update(dreamsTable)
        .set({
          content: dream.content,
          interpretation: dream.interpretation,
          mood: dream.mood,
          updatedAt: new Date(),
        })
        .where(eq(dreamsTable.id, dreamToUpdate.id));

      savedDream = { ...dreamToUpdate, ...dream, updatedAt: new Date() };
    } else {
      const result = await db.insert(dreamsTable).values(dream).returning();
      savedDream = result[0];
    }

    return savedDream;
  } catch (err) {
    console.error('Error handling dream with Drizzle ORM:', err);
    throw new Error('Failed to handle dream');
  }
}

export async function handleLogin(
  data: FormData,
  locals: RequestEvent['locals']
) {

  const email = data.get('email')?.toString();
  const password = data.get('password')?.toString();
  const isLogin = data.get('isLogin') === 'true';

  if (!email || !password) {
    throw error(400, 'Email and password are required.');
  }

  try {
    if (isLogin) {
      const { error: authError } = await locals.supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        throw error(400, authError.message);
      }
    } else {
      const { error: authError } = await locals.supabase.auth.signUp({
        email,
        password,
      });


      if (authError) {
        throw error(400, authError.message);
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Error in handleLogin:', err);
    if (err instanceof Error) {
      throw error(500, err.message);
    }
    throw error(500, 'Internal Server Error.');
  }
}
