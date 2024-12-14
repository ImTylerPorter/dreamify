<script lang="ts">
	import { writable } from 'svelte/store';
	import DreamForm from '$lib/components/DreamForm.svelte';
	import DreamDisplay from '$lib/components/DreamDisplay.svelte';
	import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';
	import type { Dream } from '$lib/types';
	import LoginSignupModal from '$lib/components/LoginSignupModal.svelte';

	let currentDream = $state<Dream | null>(null);
	let error = $state<string | null>(null);

	let { data } = $props();
	let { user } = data;

	// Manage modal open/close and login/signup toggle states
	const modalOpen = writable(false);
	const isLogin = writable(true);

	function handleDreamInterpreted(dream: Dream) {
		error = null;
		currentDream = dream;
	}

	function handleInterpretationError(message: string) {
		error = message;
		currentDream = null;
	}

	function handleToggleModal() {
		$modalOpen = !$modalOpen;
	}

	function handleToggleLoginSignup() {
		$isLogin = !$isLogin;
	}
</script>

<div class="min-h-screen bg-[#13111C] relative overflow-hidden">
	<main class="container mx-auto px-4 py-16 relative z-10">
		<div class="text-center mb-16 space-y-4">
			<h1
				class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-200 text-transparent bg-clip-text"
			>
				Dreamify
			</h1>
			<p class="text-xl text-purple-200/80">Simplify and amplify your dream interpretations</p>
		</div>

		<div class="max-w-2xl mx-auto">
			<div class="relative group">
				<div
					class="relative bg-[#1A1827] backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10"
				>
					{#if error}
						<ErrorDisplay message={error} />
					{/if}

					<DreamForm
						{user}
						onDreamInterpreted={handleDreamInterpreted}
						onInterpretationError={handleInterpretationError}
						onToggleModal={handleToggleModal}
					/>

					{#if currentDream}
						<DreamDisplay dream={currentDream} />
					{/if}
				</div>
			</div>
		</div>
	</main>
</div>

<!-- Modal -->
{#if $modalOpen}
	<LoginSignupModal
		onToggleModal={handleToggleModal}
		onToggleLoginSignup={handleToggleLoginSignup}
		isLogin={$isLogin}
	/>
{/if}
