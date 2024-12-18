<script lang="ts">
	import { derived } from 'svelte/store';
	import { dreams } from '$lib/stores/dreams';
	import DreamCard from './DreamCard.svelte';
	import { rawSearchQuery } from '$lib/stores/dreams';

	// Derived store to generate the search key reactively
	const searchKey = derived([dreams], ([$dreams]) => `${rawSearchQuery}-${$dreams.length}`);
</script>

{#key $searchKey}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each $dreams as dream (dream.id)}
			<DreamCard {dream} />
		{/each}

		{#if $dreams.length === 0}
			<div class="col-span-full text-center py-12">
				<p class="text-gray-400">No dreams found for this search.</p>
			</div>
		{/if}
	</div>
{/key}
