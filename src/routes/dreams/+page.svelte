<script lang="ts">
	import DreamsHeader from '$lib/components/dreams/DreamsHeader.svelte';
	import DreamsList from '$lib/components/dreams/DreamsList.svelte';

	let { data } = $props();
</script>

<div class="min-h-screen bg-[#13111C]">
	<div class="container mx-auto px-4 py-16">
		<DreamsHeader totalDreams={data.totalDreams} />

		<div class="relative overflow-hidden">
			<!-- Decorative gradient effects -->
			<div
				class="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"
			></div>
			<div
				class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl"
			></div>

			<!-- Dreams list with backdrop blur -->
			<div class="relative backdrop-blur-sm">
				<DreamsList dreams={data.dreams} />
			</div>
		</div>
	</div>
</div>
