<script lang="ts">
	import { fade } from 'svelte/transition';
	import DreamHeader from '$lib/components/dreams/show/DreamHeader.svelte';
	import DreamContent from '$lib/components/dreams/show/DreamContent.svelte';
	import DreamInterpretation from '$lib/components/dreams/show/DreamInterpretation.svelte';
	import DreamActions from '$lib/components/dreams/show/DreamActions.svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();

	async function handleDelete() {
		if (!confirm('Are you sure you want to delete this dream?')) return;

		try {
			const response = await fetch(`/dreams/${data.dream?.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to delete dream');
			}

			goto('/dreams');
		} catch (e) {
			console.error('Error deleting dream:', e);
			alert('Failed to delete dream');
		}
	}
</script>

<div class="min-h-screen bg-[#13111C] py-16" transition:fade>
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto relative">
			<!-- Decorative gradient effects -->
			<div
				class="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"
			></div>
			<div
				class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl"
			></div>

			<div class="relative">
				<DreamHeader dream={data.dream} />
				<DreamContent dream={data.dream} />

				{#if data.dream.interpretation}
					<DreamInterpretation dream={data.dream} />
				{/if}

				<DreamActions onDelete={handleDelete} />
			</div>
		</div>
	</div>
</div>
