import { getOrCreateUserProfile, getProfileStats } from '$lib/auth/index.js';
import { error } from "@sveltejs/kit";
import { db } from "$lib/db";
import { profileTable } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export async function load({ locals }) {
  try {
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

    const profileImage = data.get('profile_image') as File;

    if (profileImage) {
      const fileName = (profileImage.name || 'default_profile.jpg').replace(/\s+/g, '-');
      const { error: uploadError } = await locals.supabase.storage
        .from('images')
        .upload(`${fileName}`, profileImage, {
          metadata: { userId: userProfile.id }
        });

      if (uploadError) {
        error(401, uploadError.message);
      }

      const publicUrl = locals.supabase.storage
        .from('images')
        .getPublicUrl(fileName).data.publicUrl;

      await db.update(profileTable).set({
        profileImage: publicUrl,
      }).where(eq(profileTable.id, userProfile.id));
    } else {

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

  }
};