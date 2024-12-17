<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Book } from 'lucide-svelte';
	import DreamCard from './DreamCard.svelte';
	import type { Dream } from '$lib/types';

	const { dreams } = $props<{ dreams: Dream[] }>();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" transition:fade>
	{#each dreams as dream (dream.id)}
		<DreamCard {dream} />
	{/each}

	{#if dreams.length === 0}
		<div class="col-span-full flex flex-col items-center justify-center py-12 text-center">
			<Book class="w-12 h-12 text-purple-400/50 mb-4" />
			<p class="text-purple-200/70 text-lg mb-2">No dreams recorded yet</p>
			<p class="text-purple-200/50">Start by logging your first dream!</p>
		</div>
	{/if}
</div>
