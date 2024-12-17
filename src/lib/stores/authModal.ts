import { writable } from 'svelte/store';

type AuthModalState = {
  open: boolean;
  isLogin: boolean;
};

export const authModal = writable<AuthModalState>({
  open: false,
  isLogin: true
});

export function openAuthModal(isLogin = true) {
  authModal.set({ open: true, isLogin });
}

export function closeAuthModal() {
  authModal.set({ open: false, isLogin: true });
}

export function toggleAuthModal() {
  authModal.update((state) => ({ ...state, open: !state.open }));
}

export function toggleAuthMode() {
  authModal.update((state) => ({ ...state, isLogin: !state.isLogin }));
}
