import { writable, get } from 'svelte/store';
import type { Dream } from '$lib/types';

const PAGE_SIZE = 10;

export const dreams = writable<Dream[]>([]);
export const isLoading = writable(false);
export const hasMore = writable(true);
export const rawSearchQuery = writable('');

// Offset (non-reactive for simplicity)
let offset = 0;

// Reload all dreams with the new search query
export async function reloadDreams() {
  offset = 0;              // Reset pagination offset
  dreams.set([]);          // Clear dreams list
  hasMore.set(true);       // Allow pagination to resume
  await loadMoreDreams();  // Fetch fresh results
}

// Fetch dreams (with search query and pagination)
export async function loadMoreDreams() {
  if (get(isLoading) || !get(hasMore)) return;

  isLoading.set(true);

  try {
    const searchQuery = get(rawSearchQuery).trim();

    const response = await fetch(
      `/api/dreams?limit=${PAGE_SIZE}&offset=${offset}&q=${encodeURIComponent(searchQuery)}`
    );
    if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

    const { dreams: newDreams, totalDreams } = await response.json();

    dreams.update((current) => {
      if (offset === 0) {
        return newDreams; // Replace on new search
      }
      return [...current, ...newDreams]; // Append for pagination
    });

    offset += newDreams.length;

    if (offset >= totalDreams) hasMore.set(false);
  } catch (error) {
    console.error('Error loading dreams:', error);
    hasMore.set(false);
  } finally {
    isLoading.set(false);
  }
}
