<script lang="ts">
	import { User, Mail, AtSign, FileText } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import type { Profile } from '$lib/types';

	const props = $props<{ profile: Profile; onSave: (profile: Profile) => void }>();
	const { profile: initialProfile, onSave } = props;

	const profile = $state({ ...initialProfile });
	const isLoading = $state(false);
	const error = $state('');

	async function handleSubmit() {
		// isLoading.set(true);
		// error.set('');
		// try {
		// 	const updatedProfile = await updateProfile($profile);
		// 	onSave(updatedProfile);
		// } catch (e) {
		// 	error.set('Failed to update profile');
		// } finally {
		// 	isLoading.set(false);
		// }
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div>
			<label class="block text-sm font-medium text-purple-200 mb-2">First Name</label>
			<Input
				type="text"
				bind:value={profile.firstName}
				icon={User}
				placeholder="Enter your first name"
			/>
		</div>

		<div>
			<label class="block text-sm font-medium text-purple-200 mb-2">Last Name</label>
			<Input
				type="text"
				bind:value={profile.lastName}
				icon={User}
				placeholder="Enter your last name"
			/>
		</div>
	</div>

	<div>
		<label class="block text-sm font-medium text-purple-200 mb-2">Display Name</label>
		<Input
			type="text"
			bind:value={profile.displayName}
			icon={AtSign}
			placeholder="Choose a display name"
		/>
	</div>

	<div>
		<label class="block text-sm font-medium text-purple-200 mb-2">Email</label>
		<Input type="email" bind:value={profile.email} icon={Mail} readonly />
	</div>

	<div>
		<label class="block text-sm font-medium text-purple-200 mb-2">Bio</label>
		<Textarea
			bind:value={profile.bio}
			icon={FileText}
			placeholder="Tell us about yourself..."
			rows={4}
		/>
	</div>

	{#if error}
		<p class="text-red-400 text-sm">{error}</p>
	{/if}

	<div class="flex justify-end space-x-4">
		<Button type="submit" disabled={isLoading}>
			{isLoading ? 'Saving...' : 'Save Changes'}
		</Button>
	</div>
</form>
