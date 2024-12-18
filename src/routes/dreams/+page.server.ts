// src/routes/dreams/+page.server.ts
import { error } from '@sveltejs/kit';
import { eq, and, sql } from 'drizzle-orm';
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
    const search = url.searchParams.get('q')?.trim() || '';

    // Start with a guaranteed condition: user must match
    const conditions = [eq(dreamsTable.userId, userProfile.id)];

    // Add search conditions if `search` is not empty
    if (search) {
      // Adjust the field 'title' to whatever makes sense in your schema
      conditions.push(sql`LOWER(${dreamsTable.title}) LIKE LOWER(${`%${search}%`})`);
    }

    // Combine all conditions with `and()`
    const whereCondition = conditions.length > 1 ? and(...conditions) : conditions[0];

    const [dreamsResult, totalCount] = await Promise.all([
      db
        .select()
        .from(dreamsTable)
        .where(whereCondition)
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`COUNT(*)` })
        .from(dreamsTable)
        .where(whereCondition),
    ]);

    return {
      dreams: dreamsResult as Dream[],
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
