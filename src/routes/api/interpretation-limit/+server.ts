import { checkAndIncrementDailyLimit } from '$lib/server/dreamLimit';
import { error, json } from '@sveltejs/kit';

export async function POST({ locals }) {
  const user = locals.user;
  if (!user) {
    throw error(401, 'Unauthorized');
  }

  const allowed = await checkAndIncrementDailyLimit(user.id);

  if (!allowed) {
    return json({ message: 'Daily limit of 5 interpretations reached.' }, { status: 403 });
  }

  return json({ message: 'Allowed' });
}
