<script lang="ts">
	import { User, Mail, AtSign, FileText } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import type { Profile } from '$lib/types';

	const props = $props<{
		profile: Profile;
		onHandleProfileUpdate: (formData: FormData) => void;
		onUpdateProfileState: (profile: Profile) => void;
	}>();
	const { profile: initialProfile, onHandleProfileUpdate, onUpdateProfileState } = props;

	const profile = $state({ ...initialProfile });
	const isLoading = $state(false);
	const error = $state('');

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		onHandleProfileUpdate(formData);
	}

	$effect(() => {
		onUpdateProfileState(profile);
	});
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
				name="first_name"
			/>
		</div>

		<div>
			<label class="block text-sm font-medium text-purple-200 mb-2">Last Name</label>
			<Input
				type="text"
				bind:value={profile.lastName}
				icon={User}
				placeholder="Enter your last name"
				name="last_name"
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
			name="display_name"
		/>
	</div>

	<div>
		<label class="block text-sm font-medium text-purple-200 mb-2">Email</label>
		<Input type="email" bind:value={profile.email} icon={Mail} readonly name="email" />
	</div>

	<div>
		<label class="block text-sm font-medium text-purple-200 mb-2">Bio</label>
		<Textarea
			bind:value={profile.bio}
			icon={FileText}
			placeholder="Tell us about yourself..."
			rows={4}
			name="bio"
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
