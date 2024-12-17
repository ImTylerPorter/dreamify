import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { dreamsTable } from '$lib/db/schema';
import { getOrCreateUserProfile } from '$lib/auth';

export async function GET({ locals, url }) {
  try {
    const userProfile = await getOrCreateUserProfile(locals);

    if (!userProfile) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const limit = Math.min(Number(url.searchParams.get('limit')) || 10, 50);
    const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);

    const dreams = await db
      .select()
      .from(dreamsTable)
      .where(eq(dreamsTable.userId, userProfile.id))
      .limit(limit)
      .offset(offset);

    return json({ dreams });
  } catch (e) {
    console.error('Error fetching paginated dreams:', e);
    return json({ error: 'Failed to fetch dreams' }, { status: 500 });
  }
}
