<script lang="ts">
	import ProfileHeader from '$lib/components/ProfileHeader.svelte';
	import ProfileStats from '$lib/components/ProfileStats.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';

	let { data } = $props();
	let { profile, stats } = data;

	let isEditing = $state(false);
	let error = $state('');

	function handleEdit() {
		isEditing = true;
	}

	function handleSave() {
		isEditing = false;
	}
	console.log(profile, 'profile');
</script>

<div class="min-h-screen bg-[#13111C]">
	{#if error}
		<div class="p-4 bg-red-500/20 text-red-200 text-center">
			{error}
		</div>
	{/if}

	{#if profile}
		<div class="max-w-7xl mx-auto px-4 py-8">
			<ProfileHeader {profile} onEdit={handleEdit} />

			{#if stats}
				<ProfileStats {stats} />
			{/if}

			{#if isEditing}
				<div class="mt-8 bg-white/5 rounded-lg p-6 border border-white/10">
					<ProfileForm {profile} onSave={handleSave} />
				</div>
			{/if}
		</div>
	{/if}
</div>
