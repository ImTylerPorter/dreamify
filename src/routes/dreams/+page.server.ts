import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/db';
import type { PageServerLoad } from './$types';
import { getOrCreateUserProfile } from '$lib/auth'
import { dreamsTable } from '$lib/db/schema';

export const load = (async ({ locals }) => {
  try {
    const userProfile = await getOrCreateUserProfile(locals)

    if (!userProfile) {
      throw error(401, 'Unauthorized');
    }

    const dreams = await db.select().from(dreamsTable).where(eq(dreamsTable.userId, userProfile.id))

    return {
      dreams,
      totalDreams: dreams.length
    };
  } catch (e) {
    console.error('Error loading dreams:', e);
    throw error(500, 'Failed to load dreams');
  }
}) satisfies PageServerLoad;