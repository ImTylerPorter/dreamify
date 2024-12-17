<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Calendar, ChevronRight } from 'lucide-svelte';
	import type { Dream } from '$lib/types';
	import DreamMood from './DreamMood.svelte';
	import DreamDate from './DreamDate.svelte';
	import DreamInterpretation from './DreamInterpretation.svelte';

	const { dream } = $props<{ dream: Dream }>();
</script>

<div
	class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 flex flex-col h-full"
	transition:fade
>
	<div class="flex justify-between items-start mb-4">
		<h3 class="text-xl font-semibold text-purple-200">{dream.title}</h3>
	</div>

	<p class="text-purple-200/80 mb-4 line-clamp-3">{dream.content}</p>

	{#if dream.interpretation}
		<DreamInterpretation interpretation={dream.interpretation} />
	{/if}

	{#if dream.mood}
		<DreamMood mood={dream.mood} />
	{/if}

	<!-- Bottom Section: Date and Link -->
	<div class="mt-4 flex justify-between items-center">
		<div class="flex items-center gap-2">
			<Calendar class="w-4 h-4 text-purple-300/70" />
			<DreamDate date={dream.createdAt!} />
		</div>

		<a
			href={`/dreams/${dream.id}`}
			class="inline-flex items-center text-sm text-purple-300/70 hover:text-purple-300 transition-colors"
		>
			View Details
			<ChevronRight class="w-4 h-4 ml-1" />
		</a>
	</div>
</div>
