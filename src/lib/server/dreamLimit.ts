import { db } from '$lib/db';
import { interpretationsTable } from '$lib/db/schema'; // Import your schema
import { eq, and } from 'drizzle-orm';

export async function checkAndIncrementDailyLimit(userId: string): Promise<boolean> {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

  // Check if an entry exists for today
  const existingUsage = await db
    .select()
    .from(interpretationsTable)
    .where(
      and(
        eq(interpretationsTable.userId, userId),
        eq(interpretationsTable.date, today)
      )
    )
    .limit(1);

  if (existingUsage.length === 0) {
    // No usage record exists, create a new one with count = 1
    await db.insert(interpretationsTable).values({
      userId,
      date: today,
      count: 1,
    });
    return true; // Allowed
  }

  // If a record exists, check the count
  const usage = existingUsage[0];
  if (usage.count >= 5) {
    return false; // Limit reached
  }

  // Increment the usage count
  await db
    .update(interpretationsTable)
    .set({ count: usage.count + 1 })
    .where(
      and(
        eq(interpretationsTable.userId, userId),
        eq(interpretationsTable.date, today)
      )
    );

  return true; // Allowed
}
