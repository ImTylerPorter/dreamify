<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils';

	const { message } = $props<{ message: string }>();
</script>

{#if message}
	<div
		class={cn('mb-4 p-4 bg-red-500/20 border border-red-500', 'rounded-lg text-red-100')}
		transition:fade
	>
		{message}
	</div>
{/if}
