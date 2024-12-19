<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import { enhance } from '$app/forms';
	import { userProfile } from '$lib/stores/userStore';

	const { onToggleModal, onDreamInterpreted, onInterpretationError } = $props();

	let dreamTitle = $state('');
	let dreamContent = $state('');
	let isLoading = $state(false);
	let remainingDreams = $state(5);

	async function fetchRemainingDreams() {
		try {
			const response = await fetch('/api/interpretation-limit?action=check', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			console.log(data, 'Fetch Remaining Dreams'); // Debugging log
			if (response.ok) {
				remainingDreams = data.remaining;
			} else {
				throw new Error(data.message || 'Failed to fetch remaining dreams');
			}
		} catch (error) {
			remainingDreams = 0;
			console.error(error);
		}
	}

	async function handleSubmit(_event: SubmitEvent) {
		isLoading = true;
		await fetchRemainingDreams();
		if (remainingDreams === 0) {
			onInterpretationError('You have reached your daily limit of dream interpretations.');
			isLoading = false;
			return;
		}
		// Proceed with the dream submission...
	}

	function handleResult({ result }: { result: any }) {
		if (result.type === 'success' && result.data?.dream) {
			onDreamInterpreted(result.data.dream);
			dreamTitle = '';
			dreamContent = '';
			fetchRemainingDreams(); // Refresh remaining count after successful interpretation
		} else if (result.type === 'failure') {
			onInterpretationError(result.data?.error || 'Failed to submit dream');
		}
		isLoading = false;
	}

	function toggleModal() {
		onToggleModal();
	}

	fetchRemainingDreams();
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			handleSubmit(new SubmitEvent('submit'));
			handleResult({ result });
		};
	}}
	class="space-y-6"
>
	<div class="space-y-2">
		<label for="dreamTitle" class="block text-sm font-medium text-purple-200/90">
			Dream Title
		</label>
		<Input
			id="dreamTitle"
			name="title"
			bind:value={dreamTitle}
			placeholder="Enter a title for your dream"
			required
		/>
	</div>

	<div class="space-y-2">
		<label for="dreamContent" class="block text-sm font-medium text-purple-200/90">
			Dream Description
		</label>
		<Textarea
			id="dreamContent"
			name="content"
			bind:value={dreamContent}
			placeholder="Describe your dream in detail..."
			required
		/>
	</div>

	{#if remainingDreams < 3}
		<p class="text-sm text-gray-500">
			You have <span class="font-semibold">{remainingDreams}</span> dream interpretations left for today.
		</p>
	{/if}

	{#if $userProfile}
		<!-- If user is logged in, show the submit button -->
		<Button
			type="submit"
			disabled={isLoading || remainingDreams <= 0}
			variant={isLoading ? 'loading' : 'default'}
		>
			{#if isLoading}
				<div class="flex items-center justify-center space-x-2">
					<span
						class="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"
					></span>
					<span>Interpreting Dream...</span>
				</div>
			{:else}
				<span class="flex items-center justify-center space-x-2">
					<span>✨</span>
					<span>Interpret Dream</span>
				</span>
			{/if}
		</Button>
	{:else}
		<!-- If no user is logged in, open the login/signup modal -->
		<Button onclick={toggleModal}>
			<span class="flex items-center justify-center space-x-2">
				<span>✨</span>
				<span>Interpret Dream</span>
			</span>
		</Button>
	{/if}
</form>
