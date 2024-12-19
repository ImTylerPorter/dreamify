import { checkAndIncrementDailyLimit } from '$lib/server/dreamLimit';
import { error, json } from '@sveltejs/kit';

export async function POST({ locals }) {
  const user = locals.user;
  if (!user) {
    throw error(401, 'Unauthorized');
  }

  const { allowed, remaining } = await checkAndIncrementDailyLimit(user.id);

  if (!allowed) {
    return json({ message: 'Daily limit of 8 interpretations reached.', remaining }, { status: 403 });
  }

  return json({ message: 'Allowed', remaining });
}
