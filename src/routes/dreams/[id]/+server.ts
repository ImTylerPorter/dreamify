// src/routes/dreams/[id]/+server.ts
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { eq } from 'drizzle-orm';
import { dreamsTable } from '$lib/db/schema';
import { error, json } from '@sveltejs/kit';
import { getOrCreateUserProfile } from '$lib/auth';


export const DELETE: RequestHandler = async ({ params, locals }) => {
  try {
    const userProfile = await getOrCreateUserProfile(locals);

    if (!userProfile) {
      throw error(401, 'Unauthorized');
    }

    const dreamId = params.id;

    const dream = await db
      .select()
      .from(dreamsTable)
      .where(eq(dreamsTable.id, dreamId))
      .limit(1)
      .execute()
      .then((result) => result[0]);

    if (!dream) {
      throw error(404, 'Dream not found');
    }

    if (dream.userId !== userProfile.id) {
      throw error(403, 'Forbidden');
    }

    await db
      .delete(dreamsTable)
      .where(eq(dreamsTable.id, dreamId))
      .execute();


    return json({ success: true });
  } catch (e) {
    if (e instanceof Response) {
      throw e;
    }
    console.error('Error deleting dream:', e);
    throw error(500, 'Internal Server Error');
  }
};
