<script lang="ts">
	import { cn } from '$lib/utils';

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	export let variant: 'default' | 'loading' = 'default';
	export let className = '';
</script>

<button
	{type}
	{disabled}
	class={cn(
		'w-full py-3 px-6 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg',
		'hover:from-purple-700 hover:to-indigo-700 transition-all duration-200',
		'disabled:opacity-50 disabled:cursor-not-allowed',
		className
	)}
	{...$$restProps}
>
	<slot />
</button>
