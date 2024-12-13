<!-- Extract reusable textarea component -->
<script lang="ts">
	import { cn } from '$lib/utils';

	export let value = '';
	export let rows = 6;
	export let className = '';
	export let placeholder = '';
	export let required = false;
</script>

<textarea
	bind:value
	{rows}
	{placeholder}
	{required}
	class={cn(
		'mt-1 block w-full rounded-md bg-purple-950/50 border-purple-500',
		'text-white placeholder-purple-300',
		'focus:ring-2 focus:ring-purple-400 focus:border-transparent',
		className
	)}
	{...$$restProps}
/>
