<script lang="ts">
	import { Calendar } from 'lucide-svelte';
	import type { Dream } from '$lib/types';
	import DreamDate from '../DreamDate.svelte';

	const { dream } = $props<{ dream: Dream }>();
</script>

<div class="mb-8">
	<div class="flex items-center justify-between">
		<h1
			class="text-3xl font-bold bg-gradient-to-r from-purple-200 to-indigo-200 text-transparent bg-clip-text"
		>
			{dream.title}
		</h1>
		<div class="flex items-center gap-2 text-purple-300/70">
			<Calendar class="w-4 h-4" />
			<DreamDate date={dream.createdAt!} />
		</div>
	</div>
</div>
