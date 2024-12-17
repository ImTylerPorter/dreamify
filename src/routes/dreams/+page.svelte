<script lang="ts">
	import DreamsHeader from '$lib/components/dreams/DreamsHeader.svelte';
	import DreamsList from '$lib/components/dreams/DreamsList.svelte';
	import { onMount } from 'svelte';
	import { dreams, isLoading, hasMore, loadMoreDreams } from '$lib/stores/dreams';

	let { data } = $props();

	// Initialize store with server-loaded dreams
	dreams.set(data.dreams);

	let sentinel: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMoreDreams();
				}
			},
			{ rootMargin: '160px' }
		);
		if (sentinel) observer.observe(sentinel);
	});
</script>

<div class="min-h-screen bg-[#13111C]">
	<div class="container mx-auto px-4 py-16">
		<DreamsHeader totalDreams={data.totalDreams} />

		<div class="relative backdrop-blur-sm">
			<DreamsList />

			<!-- Loading Indicator -->
			{#if $isLoading}
				<div class="text-center py-4">Loading...</div>
			{/if}

			<!-- Infinite Scroll Sentinel -->
			{#if $hasMore}
				<div bind:this={sentinel} class="h-10"></div>
			{/if}
		</div>
	</div>
</div>
