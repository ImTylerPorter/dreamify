<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { marked } from 'marked'; // Import the markdown parser

	const { dream } = $props();

	// Convert Markdown to HTML
	let interpretationHTML = dream?.interpretation ? marked(dream.interpretation) : '';
</script>

<div class="mt-8 relative group" in:fly={{ y: 20, duration: 500, delay: 200 }} out:fade>
	<div
		class="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-indigo-500/50 rounded-lg blur opacity-30"
	></div>
	<div class="relative p-6 bg-white/5 rounded-lg border border-white/10">
		<h2
			class="text-xl font-semibold bg-gradient-to-r from-purple-200 to-indigo-200 text-transparent bg-clip-text mb-4"
		>
			Interpretation
		</h2>
		<!-- Conditional rendering for {@html} -->
		{#if interpretationHTML}
			<div class="theDream text-purple-100/90 leading-relaxed">{@html interpretationHTML}</div>
		{:else}
			<p class="text-purple-100/90 leading-relaxed">No interpretation available.</p>
		{/if}

		{#if dream.mood}
			<div class="mt-4 flex items-center space-x-2 text-sm text-purple-300/80">
				<span class="inline-block w-2 h-2 rounded-full bg-purple-400/50"></span>
				<span>Mood: {dream.mood}</span>
			</div>
		{/if}
	</div>
</div>
