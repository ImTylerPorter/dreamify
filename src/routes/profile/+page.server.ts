import { getOrCreateUserProfile, getProfileStats } from '$lib/auth/index.js';

export async function load({ locals }) {
  try {

    // Load user profile, sections and settings
    const profile = await getOrCreateUserProfile(locals);
    const stats = await getProfileStats(locals)

    console.log(profile)
    return {
      profile,
      stats
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return { error: 'Failed to load data' };
  }
}