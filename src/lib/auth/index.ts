import { profileTable } from './../db/schema';
import { db } from "$lib/db";
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const getOrCreateUserProfile = async (locals: App.Locals) => {
  if (!locals.user) {
    return null;
  }

  const currentProfile = await db.query.profileTable.findFirst({
    where: eq(profileTable.id, locals.user.id)
  })

  if (currentProfile) {
    return currentProfile
  }

  await db.insert(profileTable).values({
    userId: locals.user.id,
    firstName: locals.user.firstName ? locals.user.firstName : '',
    lastName: locals.user.lastName ? locals.user.lastName : '',
    email: locals.user.email ?? ""
  })

  const newProfile = await db.query.profileTable.findFirst({
    where: eq(profileTable.id, locals.user.id)
  });

  if (!newProfile) {
    error(500, "Could not create profile")
  }

  return newProfile;
}