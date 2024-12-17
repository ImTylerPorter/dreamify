<script lang="ts">
	import { getMoodColor } from '$lib/utils/mood';

	const { mood } = $props<{ mood: string }>();
	const moodColor = getMoodColor(mood);
	console.log(moodColor, 'mood color');
	console.log(mood, 'mood');
</script>

<div class="mt-4 flex items-center space-x-2">
	<span class={`inline-block w-2 h-2 rounded-full ${moodColor}`}></span>
	<span class="text-sm text-purple-300/70">Mood: {mood}</span>
</div>
