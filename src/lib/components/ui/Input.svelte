<script lang="ts">
	import { cn } from '$lib/utils';

	// Type for props
	interface Props {
		type?: string;
		value?: string;
		className?: string;
		placeholder?: string;
		required?: boolean;
		icon?: typeof import('lucide-svelte').User | null; // Allow null for icon
		[key: string]: any;
	}

	let {
		type = 'text',
		value = $bindable(''),
		className = '',
		placeholder = '',
		required = false,
		icon = null, // Default to no icon
		...rest
	}: Props = $props();
</script>

<div class={cn('relative flex items-center', className)}>
	{#if icon}
		{@const SvelteComponent = icon}
		<SvelteComponent
			class="absolute top-4 left-3 w-5 h-5 text-purple-300 pointer-events-none"
		/>
	{/if}

	<input
		{type}
		bind:value
		{placeholder}
		{required}
		class={cn(
			'mt-1 block w-full rounded-lg bg-white/5 border border-purple-500/20',
			'text-white placeholder-purple-300/50',
			'focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50',
			'transition-all duration-200',
			'hover:border-purple-500/30 indent-1 py-2',
			{ 'pl-10': icon }, // Add padding if an icon is present
			className
		)}
		{...rest}
	/>
</div>
