import { error } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import { db } from '$lib/db';
import { getOrCreateUserProfile } from '$lib/auth';
import { dreamsTable } from '$lib/db/schema';
import type { PageServerLoad } from './$types';
import type { Dream } from '$lib/types';

export const load: PageServerLoad = async ({ locals, url }) => {
  try {
    const userProfile = await getOrCreateUserProfile(locals);

    if (!userProfile) {
      throw error(401, 'Unauthorized');
    }

    const limit = Math.min(Number(url.searchParams.get('limit')) || 10, 50);
    const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);

    const [dreams, totalCount] = await Promise.all([
      db
        .select()
        .from(dreamsTable)
        .where(eq(dreamsTable.userId, userProfile.id))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`COUNT(*)` })
        .from(dreamsTable)
        .where(eq(dreamsTable.userId, userProfile.id)),
    ]);

    return {
      dreams: dreams as Dream[],
      totalDreams: totalCount[0]?.count || 0,
    };
  } catch (e) {
    console.error('Error loading dreams:', e);
    return {
      dreams: [],
      totalDreams: 0,
    };
  }
};
