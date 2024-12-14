import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  // Use safeGetSession to retrieve the validated session
  const { session } = await safeGetSession();

  return {
    session,
    cookies: cookies.getAll()
  };
};
