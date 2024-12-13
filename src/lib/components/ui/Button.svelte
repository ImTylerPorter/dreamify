<script lang="ts">
	import { cn } from '$lib/utils';

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	export const variant: 'default' | 'loading' = 'default';
	export let className = '';
</script>

<button
	{type}
	{disabled}
	class={cn(
		'w-full py-3.5 px-6 text-white font-medium rounded-lg relative group/button overflow-hidden',
		'bg-gradient-to-r from-purple-600 to-indigo-600',
		'before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-600 before:to-purple-600',
		'before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
		'disabled:opacity-50 disabled:cursor-not-allowed disabled:before:opacity-0',
		'transform transition-transform active:scale-[0.98]',
		className
	)}
	{...$$restProps}
>
	<span class="relative z-10">
		<slot />
	</span>
</button>
