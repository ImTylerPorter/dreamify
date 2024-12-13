<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		value?: string;
		rows?: number;
		className?: string;
		placeholder?: string;
		required?: boolean;
		[key: string]: any
	}

	let {
		value = $bindable(''),
		rows = 6,
		className = '',
		placeholder = '',
		required = false,
		...rest
	}: Props = $props();
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
	{...rest}
></textarea>
