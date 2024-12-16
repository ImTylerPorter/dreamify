<script lang="ts">
	import type { Session, User, SupabaseClient } from '@supabase/supabase-js';
	import type { Profile } from '$lib/types';

	import DreamForm from '$lib/components/DreamForm.svelte';
	import DreamDisplay from '$lib/components/DreamDisplay.svelte';
	import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';
	import type { Dream } from '$lib/types';
	import LogoIcon from '$lib/components/LogoIcon.svelte';
	import { openAuthModal } from '$lib/stores/authModal';

	let currentDream = $state<Dream | null>(null);
	let error = $state<string | null>(null);

	interface PageProps {
		data: {
			session: Session | null;
			supabase: SupabaseClient<any, 'public', any>;
			user: User | null;
			profile: Profile | null;
		};
	}

	let { data } = $props() as PageProps;
	let { user } = data;

	function handleDreamInterpreted(dream: Dream) {
		error = null;
		currentDream = dream;
	}

	function handleInterpretationError(message: string) {
		error = message;
		currentDream = null;
	}

	function promptLoginModal() {
		openAuthModal(true);
	}
</script>

<div class="min-h-screen bg-[#13111C] relative overflow-hidden">
	<main class="container mx-auto px-4 py-16 relative z-10">
		<div class="text-center mb-16 space-y-4">
			<LogoIcon />
			<p class="text-xl text-purple-200/80">Simplify and amplify your dream interpretations</p>
		</div>

		<div class="max-w-2xl mx-auto">
			<div class="relative group">
				<div
					class="relative bg-[#1A1827] backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10"
				>
					{#if error}
						<ErrorDisplay message={error} />
					{/if}

					<DreamForm
						onDreamInterpreted={handleDreamInterpreted}
						onInterpretationError={handleInterpretationError}
						onToggleModal={promptLoginModal}
					/>

					{#if currentDream}
						<DreamDisplay dream={currentDream} />
					{/if}
				</div>
			</div>
		</div>
	</main>
</div>
