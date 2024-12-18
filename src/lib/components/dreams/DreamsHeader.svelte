<script lang="ts">
	import { rawSearchQuery, reloadDreams } from '$lib/stores/dreams';
	import { Plus, Search } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import Input from '../ui/Input.svelte';

	const { totalDreams } = $props<{ totalDreams: number }>();
	let localSearch = $state(''); // Reactive state

	function onSearchInput(e: Event) {
		localSearch = (e.target as HTMLInputElement).value.trim();
		rawSearchQuery.set(localSearch);
		reloadDreams();
	}
</script>

<div class="flex justify-between items-start gap-4 mb-8">
	<div>
		<h1
			class="text-3xl font-bold bg-gradient-to-r from-purple-200 to-indigo-200 text-transparent bg-clip-text"
		>
			Your Dreams
		</h1>
		<p class="text-purple-200/70 mt-1">
			{totalDreams}
			{totalDreams === 1 ? 'dream' : 'dreams'}
		</p>
	</div>

	<div class="flex flex-col items-center gap-3 sm:w-auto">
		<div class="relative flex-1 sm:flex-initial">
			<Input
				icon={Search}
				type="text"
				placeholder="Search dreams..."
				bind:value={localSearch}
				oninput={onSearchInput}
			/>
		</div>

		<Button onclick={() => (window.location.href = '/')}>
			<Plus class="w-4 h-4 mr-2" />
			New Dream
		</Button>
	</div>
</div>
