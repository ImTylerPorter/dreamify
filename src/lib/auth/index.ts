import { profileTable, dreamsTable, interpretationsTable, subscriptionsTable } from './../db/schema';
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
    id: locals.user.id,
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


export async function getProfileStats(locals: App.Locals) {
  if (!locals.user) {
    return null;
  }
  const userId = locals.user.id;

  // Using Promise.all for efficient parallel data fetching
  const [dreams, interpretations, subscription] = await Promise.all([
    db.query.dreamsTable.findMany({
      columns: { id: true },
      where: eq(dreamsTable.userId, userId)
    }),
    db.query.interpretationsTable.findMany({
      columns: { count: true },
      where: eq(interpretationsTable.userId, userId)
    }),
    db.query.subscriptionsTable.findFirst({
      where: eq(subscriptionsTable.userId, userId)
    })
  ]);

  // Aggregate interpretation counts
  const totalInterpretations = interpretations.reduce(
    (acc, curr) => acc + (curr.count || 0),
    0
  );

  return {
    totalDreams: dreams.length,
    interpretationsUsed: totalInterpretations,
    subscriptionStatus: subscription?.status || 'free',
    joinedDate: subscription?.createdAt
      ? new Date(subscription.createdAt)
      : new Date()
  };
}