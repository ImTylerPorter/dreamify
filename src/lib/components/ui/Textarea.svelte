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
		'mt-1 block w-full rounded-lg bg-white/5 border border-purple-500/20',
		'text-white placeholder-purple-300/50',
		'focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50',
		'transition-all duration-200',
		'hover:border-purple-500/30 indent-1.5',
		className
	)}
	{...$$restProps}
></textarea>
