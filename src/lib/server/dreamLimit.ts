import { db } from '$lib/db';
import { interpretationsTable, dreamsTable } from '$lib/db/schema'; // Import your schema
import { eq, and, sql } from 'drizzle-orm';


export async function checkAndIncrementDailyLimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

  const maxLimit = 5; // Define your daily limit


  // Fetch dream entries for today
  const dreamsToday = await db
    .select({ count: sql<number>`COUNT(*)` }) // Explicitly cast the COUNT result as a number
    .from(dreamsTable)
    .where(
      and(
        eq(dreamsTable.userId, userId),
        sql`DATE(${dreamsTable.createdAt}) = ${today.toISOString().split('T')[0]}`
      )
    )
    .limit(1);

  const actualDreamCount = dreamsToday[0]?.count ?? 0; // Default to 0 if no rows are returned

  // Fetch or create the interpretation usage for today
  const existingUsage = await db
    .select()
    .from(interpretationsTable)
    .where(
      and(
        eq(interpretationsTable.userId, userId),
        sql`DATE(${interpretationsTable.date}) = ${today.toISOString().split('T')[0]}`
      )
    )
    .limit(1);

  if (existingUsage.length === 0) {
    // No usage record exists, create one with the actual count
    await db.insert(interpretationsTable).values({
      userId,
      date: today,
      count: actualDreamCount,
    });
    const remaining = maxLimit - actualDreamCount;
    return { allowed: remaining > 0, remaining: Math.max(0, remaining) };
  }

  const usage = existingUsage[0];

  // Sync the count if it doesn't match the actual count
  if (usage.count !== actualDreamCount) {
    await db
      .update(interpretationsTable)
      .set({ count: actualDreamCount })
      .where(
        and(
          eq(interpretationsTable.userId, userId),
          sql`DATE(${interpretationsTable.date}) = ${today.toISOString().split('T')[0]}`
        )
      );
  }

  const remaining = maxLimit - actualDreamCount;

  // If remaining is 0 or less, don't increment the count
  if (remaining <= 0) {
    return { allowed: false, remaining: 0 };
  }

  // Increment the count for a new interpretation
  await db
    .update(interpretationsTable)
    .set({ count: actualDreamCount + 1 })
    .where(
      and(
        eq(interpretationsTable.userId, userId),
        sql`DATE(${interpretationsTable.date}) = ${today.toISOString().split('T')[0]}`
      )
    );

  return { allowed: true, remaining: remaining };
}
