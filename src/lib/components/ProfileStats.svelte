<script lang="ts">
	import type { ProfileStats } from '$lib/types';
	import { Calendar, Star, Book } from 'lucide-svelte';

	const { stats } = $props<{ stats: ProfileStats }>();
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
	<div class="bg-white/5 p-6 rounded-lg border border-white/10">
		<div class="flex items-center space-x-3">
			<Book class="text-purple-400" />
			<h3 class="text-lg font-medium text-white">Total Dreams</h3>
		</div>
		<p class="mt-2 text-3xl font-bold text-purple-200">{stats.totalDreams}</p>
	</div>

	<div class="bg-white/5 p-6 rounded-lg border border-white/10">
		<div class="flex items-center space-x-3">
			<Star class="text-purple-400" />
			<h3 class="text-lg font-medium text-white">Interpretations</h3>
		</div>
		<p class="mt-2 text-3xl font-bold text-purple-200">{stats.interpretationsUsed}</p>
	</div>

	<div class="bg-white/5 p-6 rounded-lg border border-white/10">
		<div class="flex items-center space-x-3">
			<Calendar class="text-purple-400" />
			<h3 class="text-lg font-medium text-white">Member Since</h3>
		</div>
		<p class="mt-2 text-xl font-bold text-purple-200">
			{stats.joinedDate.toLocaleDateString()}
		</p>
	</div>
</div>
