<script lang="ts">
	import { cn } from '$lib/utils/index';

	interface Props {
		value?: string;
		rows?: number;
		className?: string;
		placeholder?: string;
		required?: boolean;
		icon?: typeof import('lucide-svelte').User | null; // Allow optional icon
		[key: string]: any;
	}

	let {
		value = $bindable(''),
		rows = 6,
		className = '',
		placeholder = '',
		required = false,
		icon = null, // Default to no icon
		...rest
	}: Props = $props();
</script>

<div class={cn('relative flex items-start', className)}>
	{#if icon}
		{@const SvelteComponent = icon}
		<SvelteComponent class="absolute top-3 left-3 w-5 h-5 text-purple-300 pointer-events-none" />
	{/if}

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
			'hover:border-purple-500/30 indent-1 p-1',
			{ 'pl-10': icon }, // Add padding if an icon is present
			className
		)}
		{...rest}
	></textarea>
</div>
