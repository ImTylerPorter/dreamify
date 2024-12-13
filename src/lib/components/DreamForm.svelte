<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import { enhance } from '$app/forms';

	const { onDreamInterpreted, onInterpretationError } = $props();

	let dreamTitle = $state('');
	let dreamContent = $state('');
	let isLoading = $state(false);

	// This function should handle the form submission
	function handleSubmit(event: SubmitEvent) {
		isLoading = true;
	}

	// This function should handle the result of the form submission
	function handleResult(event: { result: any }) {
		if (event.result.type === 'success' && event.result.data?.dream) {
			onDreamInterpreted(event.result.data.dream);
			dreamTitle = '';
			dreamContent = '';
		} else if (event.result.type === 'failure') {
			onInterpretationError(event.result.data?.error || 'Failed to submit dream');
		}
		isLoading = false;
	}
</script>

<form
	method="POST"
	use:enhance={({ formElement, formData, action, controller, submitter }) => {
		return async ({ result, update }) => {
			handleSubmit(new SubmitEvent('submit', { submitter: formElement }));
			await update({ reset: false });
			handleResult({ result });
		};
	}}
	class="space-y-6"
>
	<div>
		<label for="dreamTitle" class="block text-sm font-medium text-purple-200"> Dream Title </label>
		<Input
			id="dreamTitle"
			name="title"
			bind:value={dreamTitle}
			placeholder="Enter a title for your dream"
			required
		/>
	</div>

	<div>
		<label for="dreamContent" class="block text-sm font-medium text-purple-200">
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

	<Button type="submit" disabled={isLoading} variant={isLoading ? 'loading' : 'default'}>
		{#if isLoading}
			<span class="inline-block animate-spin mr-2">⭐</span>
			Interpreting Dream...
		{:else}
			Interpret Dream
		{/if}
	</Button>
</form>
