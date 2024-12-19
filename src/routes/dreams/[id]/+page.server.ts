import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dreamsTable } from '$lib/db/schema';
import { db } from '$lib/db';

export const load = (async ({ params }) => {
  try {
    const dreamId = params.id;

    if (!dreamId) {
      throw error(400, 'Invalid Dream ID');
    }

    const [dream] = await db
      .select()
      .from(dreamsTable)
      .where(eq(dreamsTable.id, dreamId))
      .limit(1)
      .execute();

    if (!dream) throw error(404, 'Dream not found');

    return {
      dream
    };
  } catch (e) {
    console.error('Error loading dream:', e);
    throw error(500, 'Failed to load dream');
  }
}) satisfies PageServerLoad;