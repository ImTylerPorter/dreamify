<script lang="ts">
	import { Camera, Pencil } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { Profile } from '$lib/types';

	let selectedImage: File | null = null;
	let previewImage = $state<string | null>(null);

	// Props for profile and updatedProfile
	const { profile, onEdit, updatedProfile, onProfileImageUpdate } = $props<{
		profile: Profile;
		updatedProfile: Profile;
		onEdit: () => void;
		onProfileImageUpdate: (image: File) => void;
	}>();

	function handleImageChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			selectedImage = file;
			previewImage = URL.createObjectURL(file);
			onProfileImageUpdate(selectedImage);
		}
	}
</script>

<div class="relative mb-20">
	<div class="h-32 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-lg"></div>
	<div class="absolute -bottom-10 left-8 flex items-end space-x-4">
		<div class="relative">
			<!-- Display updated profile image if it exists -->
			<img
				src={previewImage ||
					updatedProfile.profileImage ||
					profile.profileImage ||
					'/images/default-profile.jpg'}
				alt={updatedProfile.displayName || profile.displayName || 'Profile'}
				class="w-32 h-32 rounded-full border-4 border-white bg-white"
			/>
			<label
				class="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
			>
				<Camera size={16} />
				<input type="file" accept="image/*" class="hidden" onchange={handleImageChange} />
			</label>
		</div>
		<div class="mb-4">
			<!-- Merge updated display name and fallback to profile -->
			<h1 class="text-2xl font-bold text-white">
				{updatedProfile.displayName || (updatedProfile.firstName && updatedProfile.lastName)
					? `${updatedProfile.firstName} ${updatedProfile.lastName}`
					: `${profile.firstName} ${profile.lastName}`}
			</h1>
			<!-- Merge updated email and fallback -->
			<p class="text-purple-200">{updatedProfile.email || profile.email}</p>
		</div>
		<Button variant="outline" class=" mb-4 ml-auto" onclick={onEdit}>
			<Pencil class="w-4 h-4 mr-0.5 inline-flex" />
			Edit Profile
		</Button>
	</div>
</div>
