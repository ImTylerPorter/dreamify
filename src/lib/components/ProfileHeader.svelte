<script lang="ts">
	import { Camera, Pencil } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { Profile } from '$lib/types';

	const { profile, onEdit } = $props<{ profile: Profile; onEdit: () => void }>();
</script>

<div class="relative mb-20">
	<div class="h-32 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-lg"></div>
	<div class="absolute -bottom-16 left-8 flex items-end space-x-4">
		<div class="relative">
			<img
				src={profile.profileImage || '/images/default-profile.jpg'}
				alt={profile.displayName || 'Profile'}
				class="w-32 h-32 rounded-full border-4 border-white bg-white"
			/>
			<button
				class="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
				aria-label="Update profile picture"
			>
				<Camera size={16} />
			</button>
		</div>
		<div class="mb-4">
			<h1 class="text-2xl font-bold text-white">
				{profile.displayName || `${profile.firstName} ${profile.lastName}`}
			</h1>
			<p class="text-purple-200">{profile.email}</p>
		</div>
		<Button variant="outline" class=" mb-4 ml-auto" onclick={onEdit}>
			<Pencil class="w-4 h-4 mr-0.5 inline-flex" />
			Edit Profile
		</Button>
	</div>
</div>
