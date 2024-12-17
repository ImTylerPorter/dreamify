<script lang="ts">
	import { page } from '$app/stores';

	import ProfileHeader from '$lib/components/profile/ProfileHeader.svelte';
	import ProfileStats from '$lib/components/profile/ProfileStats.svelte';
	import ProfileForm from '$lib/components/profile/ProfileForm.svelte';
	import type { Profile } from '$lib/types.js';

	let { data } = $props();
	let { stats, profile } = data;

	let updatedProfile = $state<Profile>({
		id: profile?.id ?? '', // Fallback to empty string
		userId: profile?.userId ?? '',
		firstName: profile?.firstName ?? '',
		lastName: profile?.lastName ?? '',
		displayName: profile?.displayName ?? '',
		email: profile?.email ?? '',
		profileImage: profile?.profileImage ?? '/images/default-profile.jpg',
		bio: profile?.bio ?? '',
		role: profile?.role ?? 'user', // Default role
		createdAt: profile?.createdAt ?? new Date() // Default to current date
	});

	let isEditing = $state(false);
	let error = $state('');

	function handleEdit() {
		isEditing = true;
	}

	function handleUpdatedProfileState(profile: Partial<Profile>) {
		// Compare values and update only if there are changes
		const hasChanges = Object.keys(profile).some((key) => {
			const typedKey = key as keyof Profile; // Cast to keyof Profile
			return updatedProfile[typedKey] !== profile[typedKey];
		});

		if (hasChanges) {
			updatedProfile = { ...updatedProfile, ...profile };
		}
	}

	async function handleProfileUpdate(formData: FormData) {
		try {
			// Send POST request to the server
			const response = await fetch($page.url.pathname, {
				method: 'POST',
				body: formData
			});
			const result = await response.json();
			if (result.status === 200) {
				// If successful, do something, maybe a toast message?
				isEditing = false;
			} else {
				// Display error from the server
				error = result.error || 'An unknown error occurred.';
			}
		} catch (err) {
			// Handle unexpected errors
			error = 'An error occurred while processing your request.';
		}
	}
</script>

<div class="min-h-screen bg-[#13111C]">
	{#if error}
		<div class="p-4 bg-red-500/20 text-red-200 text-center">
			{error}
		</div>
	{/if}

	{#if profile}
		<div class="max-w-7xl mx-auto px-4 py-8">
			<ProfileHeader {profile} {updatedProfile} onEdit={handleEdit} />

			{#if stats}
				<ProfileStats {stats} />
			{/if}

			{#if isEditing}
				<div class="mt-8 bg-white/5 rounded-lg p-6 border border-white/10">
					<ProfileForm
						{profile}
						onHandleProfileUpdate={handleProfileUpdate}
						onUpdateProfileState={handleUpdatedProfileState}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>
