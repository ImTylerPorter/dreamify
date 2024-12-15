<script>
	import Logo from './Logo.svelte';

	let { profile } = $props();

	let isMenuOpen = false;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};
</script>

<nav class="flex items-center justify-between px-4 py-3 sm:px-6 text-white shadow-lg">
	<!-- Logo -->
	<div class="flex items-center space-x-3">
		<a href="/"><Logo /></a>
	</div>

	<!-- Actions -->
	<div class="flex items-center space-x-4">
		<button
			class="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200"
		>
			Log In
		</button>
		<button
			class="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-indigo-500 bg-white shadow-lg border border-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-200"
		>
			Sign Up
		</button>

		<!-- Mobile Menu Toggle -->
		<button
			on:click={toggleMenu}
			class="md:hidden px-3 py-2 rounded-full text-indigo-500 hover:bg-white hover:bg-opacity-25 transition-all duration-200"
		>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16m-7 6h7"
				></path>
			</svg>
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div
			class="absolute top-16 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md flex-col space-y-4 py-6 px-6 w-full md:hidden rounded-lg"
		>
			<a href="/" class="hover:underline text-lg transition-all duration-200">Home</a>
			<a href="/dreams" class="hover:underline text-lg transition-all duration-200">My Dreams</a>
			<a href="/explore" class="hover:underline text-lg transition-all duration-200">Explore</a>
			<a href="/profile" class="hover:underline text-lg transition-all duration-200">Profile</a>
		</div>
	{/if}
</nav>
