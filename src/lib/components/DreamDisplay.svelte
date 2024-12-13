<script lang="ts">
	import { fade } from 'svelte/transition';

	const { dream } = $props();
</script>

<div class="mt-8 p-6 bg-white/5 rounded-lg" transition:fade>
	<h2 class="text-xl font-semibold text-purple-200 mb-4">Interpretation</h2>
	<p class="text-purple-100">{dream.interpretation}</p>
	{#if dream.mood}
		<p class="mt-4 text-sm text-purple-300">
			Mood: {dream.mood}
		</p>
	{/if}
</div>
