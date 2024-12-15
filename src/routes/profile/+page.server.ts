import { getOrCreateUserProfile, getProfileStats } from '$lib/auth/index.js';
import { error } from "@sveltejs/kit";
import { db } from "$lib/db";
import { profileTable } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export async function load({ locals }) {
  try {
    // Load user profile, sections and settings
    const stats = await getProfileStats(locals)

    return {
      stats
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return { error: 'Failed to load data' };
  }
}

export const actions = {
  default: async ({ request, locals }) => {
    const userProfile = await getOrCreateUserProfile(locals);

    if (!userProfile) {
      throw error(401, "You need to be logged in!");
    }

    const data = await request.formData();

    // Extract and type-check form data
    const email = data.get('email') as string | null;
    const firstName = (data.get('first_name') as string | null) ?? '';
    const lastName = (data.get('last_name') as string | null) ?? '';
    const displayName = (data.get('display_name') as string | null) ?? '';
    const bio = (data.get('bio') as string | null) ?? '';

    // Perform the database update
    await db.update(profileTable).set({
      firstName,
      lastName,
      email,
      displayName,
      bio
    }).where(eq(profileTable.id, userProfile.id));
  }
};