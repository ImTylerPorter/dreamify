<script lang="ts">
	import type {
		Session,
		User,
		SupabaseClient,
		AuthSession,
		AuthChangeEvent
	} from '@supabase/supabase-js';
	import type { Profile } from '$lib/types';
	import '../app.css';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';
	import LoginSignupModal from '$lib/components/LoginSignupModal.svelte';
	import { authModal, closeAuthModal, toggleAuthMode } from '$lib/stores/authModal';
	import { userProfile } from '$lib/stores/userStore';

	let { data, children } = $props<{
		data: {
			session: Session | null;
			supabase: SupabaseClient;
			user: User | null;
			profile: Profile | null;
		};
		children: any;
	}>();

	let { session, supabase, profile } = $derived(data);

	$effect(() => {
		if (profile) {
			userProfile.set(profile);
		} else {
			userProfile.set(null);
		}
	});

	async function handleAuth(formData: FormData) {
		try {
			const response = await fetch($page.url.pathname, {
				method: 'POST',
				body: formData
			});
			const result = await response.json();
			if (result.status === 200) {
				closeAuthModal();

				// After successful login, fetch the updated user profile from Supabase
				const {
					data: { user: updatedUser }
				} = await supabase.auth.getUser();

				if (updatedUser?.id) {
					const { data: updatedProfile } = await supabase
						.from('profiles')
						.select('*')
						.eq('id', updatedUser.id)
						.single();

					// Update our userProfile store directly, causing instant UI updates
					userProfile.set(updatedProfile);
				}
			} else {
				console.error(result.error || 'An unknown error occurred.');
			}
		} catch (err) {
			console.error('An error occurred while processing your request:', err);
		}
	}

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(
			(event: AuthChangeEvent, newSession: AuthSession | null) => {
				if (newSession?.expires_at !== session?.expires_at) {
					invalidate('supabase:auth');
				}
			}
		);

		return () => data.subscription.unsubscribe();
	});
</script>

<div>
	<Nav />
	{@render children()}
	{#if $authModal.open}
		<LoginSignupModal
			isLogin={$authModal.isLogin}
			onToggleModal={closeAuthModal}
			onToggleLoginSignup={toggleAuthMode}
			onHandleLogin={handleAuth}
		/>
	{/if}
</div>
