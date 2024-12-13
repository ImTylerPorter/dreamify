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

<div class="min-h-screen bg-[#13111C] relative overflow-hidden">
	<!-- Animated background elements -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div
			class="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse"
		></div>
		<div
			class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-600/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-1000"
		></div>
	</div>

	<main class="container mx-auto px-4 py-16 relative z-10">
		<div class="text-center mb-16 space-y-4">
			<div class="inline-block">
				<h1
					class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-200 text-transparent bg-clip-text"
				>
					Dreamify
				</h1>
				<div
					class="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-2"
				></div>
			</div>
			<p class="text-xl text-purple-200/80">Simplify and amplify your dream interpretations</p>
		</div>

		<div class="max-w-2xl mx-auto">
			<div class="relative group">
				<div
					class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"
				></div>
				<div
					class="relative bg-[#1A1827] backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10"
				>
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
			</div>
		</div>
	</main>
</div>
