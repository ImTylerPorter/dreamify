<script lang="ts">
	import DreamsHeader from '$lib/components/dreams/DreamsHeader.svelte';
	import DreamsList from '$lib/components/dreams/DreamsList.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { dreams, isLoading, hasMore, loadMoreDreams } from '$lib/stores/dreams';
	import { derived } from 'svelte/store';

	let { data } = $props();

	// Initialize store with server-loaded dreams
	dreams.set(data.dreams);
	hasMore.set(data.dreams.length < data.totalDreams);

	// Reactive totalDreams state
	let totalDreams = $state(0);

	// Update totalDreams when dreams changes
	const derivedTotalDreams = derived(dreams, ($dreams) => $dreams.length);
	const unsubscribe = derivedTotalDreams.subscribe((value) => {
		totalDreams = value;
	});

	let sentinel = $state<HTMLDivElement | null>(null);

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

	// Clean up subscription
	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<title>Dreamify - My Dreams</title>
</svelte:head>
<div class="min-h-screen bg-[#13111C]">
	<div class="container mx-auto px-4 py-16">
		<!-- Pass totalDreams reactively -->
		<DreamsHeader {totalDreams} />

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
