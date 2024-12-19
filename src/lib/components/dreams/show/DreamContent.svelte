<script lang="ts">
	import type { Dream } from '$lib/types';

	const { dream } = $props<{ dream: Dream }>();
</script>

<div class="bg-white/5 rounded-lg p-6 mb-8 border border-white/10">
	<h2 class="text-xl font-semibold text-purple-200 mb-4">Dream Description</h2>
	<p class="text-purple-200/90 leading-relaxed whitespace-pre-wrap">
		{dream.content}
	</p>
</div>
