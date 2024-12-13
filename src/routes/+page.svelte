<script lang="ts">
	import DreamForm from '$lib/components/DreamForm.svelte';
	import DreamDisplay from '$lib/components/DreamDisplay.svelte';
	import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';
	import type { Dream } from '$lib/types';

	let currentDream = $state<Dream | null>(null);
	let error = $state<string | null>(null);

	function handleDreamInterpreted(dream: Dream) {
		error = null;
		currentDream = dream;
	}

	function handleInterpretationError(message: string) {
		error = message;
		currentDream = null;
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
	<main class="container mx-auto px-4 py-16">
		<div class="text-center mb-16">
			<h1 class="text-5xl font-bold text-white mb-4">Dreamify</h1>
			<p class="text-xl text-purple-200">Simplify and amplify your dream interpretations</p>
		</div>

		<div class="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
			{#if error}
				<ErrorDisplay message={error} />
			{/if}
			<DreamForm
				onDreamInterpreted={handleDreamInterpreted}
				onInterpretationError={handleInterpretationError}
			/>

			{#if currentDream}
				<DreamDisplay dream={currentDream} />
			{/if}
		</div>
	</main>
</div>
