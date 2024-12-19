<script lang="ts">
	import { ArrowLeft, Edit2, Trash2 } from 'lucide-svelte';
	import Button from '../../ui/Button.svelte';

	const { onDelete } = $props<{
		onDelete: () => Promise<void>;
	}>();
</script>

<div class="flex items-center justify-between mt-8">
	<a
		href="/dreams"
		class="flex items-center gap-2 text-purple-300/70 hover:text-purple-300 transition-colors"
	>
		<ArrowLeft class="w-4 h-4" />
		Back to Dreams
	</a>

	<div class="flex items-center gap-3">
		<!-- TODO: Add ability to edit dream -->
		<!-- <Button
			variant="outline"
			class="border-purple-500/30 hover:bg-purple-500/10"
			on:click={() => (window.location.href = './edit')}
		>
			<Edit2 class="w-4 h-4 mr-2" />
			Edit Dream
		</Button> -->

		<button
			onclick={onDelete}
			class="p-2 rounded-lg bg-white/5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
			title="Delete dream"
		>
			<Trash2 class="w-5 h-5" />
		</button>
	</div>
</div>
