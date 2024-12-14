<script lang="ts">
	import { Mail, Lock, UserPlus } from 'lucide-svelte';
	import Input from './ui/Input.svelte';
	import Button from './ui/Button.svelte';
	import ErrorDisplay from './ErrorDisplay.svelte';

	const { isLogin, onToggleModal, onToggleLoginSignup, onHandleLogin } = $props<{
		isLogin: boolean;
		onToggleModal: () => void;
		onToggleLoginSignup: () => void;
		onHandleLogin: (formData: FormData) => void;
	}>();

	let email = '';
	let password = '';
	let confirmPassword = '';
	let error = '';

	// Clear error on input
	function clearError(): void {
		error = '';
	}

	// Handle form submission
	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		// Include isLogin toggle in the form data
		formData.append('isLogin', `${isLogin}`);
		onHandleLogin(formData);
	}
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center">
	<!-- Backdrop -->
	<div
		class="absolute inset-0 bg-gray-800/75 z-40 pointer-events-auto"
		aria-hidden="true"
		onclick={onToggleModal}
	></div>

	<!-- Modal Content -->
	<div
		class="relative bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-w-md w-full p-6 z-50 pointer-events-auto"
	>
		<header class="flex justify-between items-center mb-4">
			<h2 id="modal-title" class="text-lg font-semibold text-gray-100">
				{isLogin ? 'Login' : 'Sign Up'}
			</h2>
			<button
				onclick={onToggleModal}
				aria-label="Close modal"
				class="text-gray-400 hover:text-gray-100 transition-transform active:scale-95 focus:outline-none"
			>
				&times;
			</button>
		</header>

		<ErrorDisplay message={error} />

		<form class="space-y-4" onsubmit={handleSubmit}>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-200">
					<div class="flex items-center space-x-2">
						<Mail class="w-5 h-5 text-gray-400" />
						<span>Email</span>
					</div>
				</label>
				<Input id="email" type="email" name="email" bind:value={email} oninput={clearError} />
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-200">
					<div class="flex items-center space-x-2">
						<Lock class="w-5 h-5 text-gray-400" />
						<span>Password</span>
					</div>
				</label>
				<Input
					id="password"
					type="password"
					name="password"
					bind:value={password}
					oninput={clearError}
				/>
			</div>
			{#if !isLogin}
				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-200">
						<div class="flex items-center space-x-2">
							<UserPlus class="w-5 h-5 text-gray-400" />
							<span>Confirm Password</span>
						</div>
					</label>
					<Input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						oninput={clearError}
					/>
				</div>
			{/if}
			<Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
		</form>

		<div class="text-sm text-center mt-4">
			<button
				onclick={onToggleLoginSignup}
				class="text-gray-400 hover:text-gray-100 underline focus:outline-none"
			>
				{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
			</button>
		</div>
	</div>
</div>
