<script lang="ts">
	import { Book } from 'lucide-svelte';
	import { marked } from 'marked';
	import type { Dream } from '$lib/types';
	import DreamMood from '../DreamMood.svelte';

	const { dream } = $props<{ dream: Dream }>();

	const interpretationHTML = marked(dream.interpretation);
</script>

<div class="bg-white/5 rounded-lg p-6 border border-white/10">
	<div class="flex items-center gap-2 mb-4">
		<Book class="w-5 h-5 text-purple-400" />
		<h2 class="text-xl font-semibold text-purple-200">Interpretation</h2>
	</div>

	<div class="theDream">
		{@html interpretationHTML}
	</div>
	{#if dream.mood}
		<DreamMood mood={dream.mood} />
	{/if}
</div>
