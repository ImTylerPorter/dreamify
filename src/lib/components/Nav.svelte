<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import { User, LogOut, Heart } from 'lucide-svelte';
	import Logo from './Logo.svelte';
	import { userProfile } from '$lib/stores/userStore';
	import { openAuthModal } from '$lib/stores/authModal'; // Import openAuthModal directly for login/signup

	let isMenuOpen = $state(false);
	let menuRef: HTMLElement | null = null;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef?.contains(event.target as Node) === false && isMenuOpen) {
			isMenuOpen = false;
		}
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleClickOutside);
		}
	});

	function handleLogout() {
		if (browser && confirm('Are you sure you want to log out?')) {
			fetch('/logout', {
				method: 'GET',
				credentials: 'include'
			})
				.then((response) => {
					if (response.ok) {
						// Clear local storage and session
						localStorage.clear();
						sessionStorage.clear();
						// Reset userProfile to null
						userProfile.set(null);
						// Redirect to home page
						window.location.href = '/';
					} else {
						alert('Failed to log out. Please try again.');
					}
				})
				.catch((error) => {
					console.error('Error logging out:', error);
					alert('An unexpected error occurred. Please try again.');
				});
		}
	}

	function showLoginModal() {
		openAuthModal(true); // Open modal in login mode
	}

	function showSignupModal() {
		openAuthModal(false); // Open modal in signup mode
	}
</script>

<nav
	class="relative flex items-center justify-between px-4 py-3 sm:px-6 text-white shadow-lg"
	bind:this={menuRef}
>
	<!-- Logo -->
	<div class="flex items-center space-x-3">
		<a href="/"><Logo /></a>
	</div>

	<!-- Actions -->
	<div class="flex items-center space-x-4">
		{#if $userProfile}
			<!-- If userProfile is set, user is logged in -->
			<button
				aria-haspopup="true"
				aria-expanded={isMenuOpen}
				aria-label="Toggle Menu"
				onclick={toggleMenu}
				class="cursor-pointer"
			>
				<img
					src={$userProfile.profileImage
						? $userProfile.profileImage
						: '/images/default-profile.jpg'}
					alt=""
					class="hover:scale-75 duration-300 w-10 h-10 rounded-full border-2 border-white bg-white"
				/>
			</button>
		{:else}
			<!-- If no userProfile, show login/signup buttons -->
			<button
				onclick={showLoginModal}
				class="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200"
			>
				Log In
			</button>
			<button
				onclick={showSignupModal}
				class="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-indigo-500 bg-white shadow-lg border border-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-200"
			>
				Sign Up
			</button>
		{/if}
	</div>

	{#if isMenuOpen}
		<div
			class="absolute top-full right-6 mt-2 bg-gray-800 text-white shadow-lg rounded-lg w-60 z-50 min-w-[8rem] overflow-hidden border shadow-md bg-border"
			transition:fade={{ duration: 100 }}
		>
			<a
				href="/dreams"
				class="flex items-center text-sm px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
			>
				<Heart class="w-4 h-4 mr-2" />
				My Dreams
			</a>
			<a
				href="/profile"
				class="flex items-center text-sm px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
			>
				<User class="w-4 h-4 mr-2" />
				Profile
			</a>
			<div role="separator" aria-orientation="horizontal" class="-mx-1 my-1 h-px bg-border"></div>
			<button
				onclick={handleLogout}
				class="flex items-center text-sm w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200"
			>
				<LogOut class="w-4 h-4 mr-2" />
				Logout
			</button>
		</div>
	{/if}
</nav>
