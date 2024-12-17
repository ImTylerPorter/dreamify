import { writable, get } from 'svelte/store';
import type { Dream } from '$lib/types';

const PAGE_SIZE = 10;

export const dreams = writable<Dream[]>([]); // Writable store for dreams
export const isLoading = writable(false);    // Tracks loading state
export const hasMore = writable(true);       // Tracks if more data is available
export let offset = 0;                       // Tracks pagination offset

export async function loadMoreDreams() {
  // Prevent multiple calls while already loading or if no more data
  if (get(isLoading) || !get(hasMore)) return;

  isLoading.set(true); // Set loading to true

  try {
    const url = `/api/dreams?limit=${PAGE_SIZE}&offset=${offset}&_=${Date.now()}`; // Cache busting
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch failed:', response.status, errorText);
      throw new Error(`Failed to fetch dreams: ${response.statusText}`);
    }

    const { dreams: newDreams } = await response.json();

    if (newDreams.length === 0) {
      hasMore.set(false); // No more data
    }

    // Deduplicate and append dreams
    dreams.update((current) => {
      const existingIds = new Set(current.map((dream) => dream.id));
      const uniqueDreams = newDreams.filter((dream: Dream) => !existingIds.has(dream.id));
      return [...current, ...uniqueDreams];
    });

    // Update offset
    if (newDreams.length < PAGE_SIZE) {
      hasMore.set(false); // No more pages available
    } else {
      offset += PAGE_SIZE;
    }
  } catch (error) {
    console.error('Error loading more dreams:', error);
    hasMore.set(false); // Stop further calls on error
  } finally {
    isLoading.set(false); // Ensure loading is reset
  }
}
