import { json, error } from '@sveltejs/kit';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '$lib/db';
import { getOrCreateUserProfile } from '$lib/auth';
import { dreamsTable } from '$lib/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
  try {
    const userProfile = await getOrCreateUserProfile(locals);
    if (!userProfile) throw error(401, 'Unauthorized');

    const limit = Math.min(Number(url.searchParams.get('limit')) || 10, 50);
    const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);
    const search = url.searchParams.get('q')?.trim() || '';

    // Base condition: Fetch dreams for this user
    const conditions = [eq(dreamsTable.userId, userProfile.id)];

    // Add partial, case-insensitive search on 'title'
    if (search) {
      conditions.push(sql`LOWER(${dreamsTable.title}) LIKE LOWER(${`%${search}%`})`);
    }

    const whereCondition = and(...conditions);

    // Fetch matching dreams and total count
    const [dreamsResult, totalCount] = await Promise.all([
      db.select().from(dreamsTable).where(whereCondition).limit(limit).offset(offset),
      db.select({ total: sql<number>`COUNT(*)` }).from(dreamsTable).where(whereCondition),
    ]);


    return json({
      dreams: dreamsResult,
      totalDreams: totalCount[0]?.total || 0,
    });
  } catch (err) {
    console.error('Error fetching dreams:', err);
    throw error(500, 'Internal Server Error');
  }
};
