<script lang="ts">
	import { formatDate } from '$lib/utils/date';

	const { date } = $props<{ date: Date | string }>();
</script>

<span class="text-sm text-purple-300/70">
	{formatDate(date)}
</span>
