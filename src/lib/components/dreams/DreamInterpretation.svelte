<script lang="ts">
	import { Book } from 'lucide-svelte';
	import { marked } from 'marked';

	const { interpretation } = $props<{ interpretation: string }>();
	let interpretationHTML = marked(interpretation) ?? '';
</script>

<div class="border-t border-white/10 pt-4 mt-4">
	<div class="flex items-center gap-2 text-sm font-medium text-purple-300 mb-2">
		<Book class="w-4 h-4" />
		<h4>Interpretation</h4>
	</div>
	<p class="text-purple-200/70 line-clamp-2">{@html interpretationHTML}</p>
</div>
