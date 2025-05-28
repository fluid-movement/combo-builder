import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createLevelStore() {
  const defaultLevel = '';

  // Get initial value from localStorage if we're in the browser
  const initialValue = browser
    ? localStorage.getItem('selectedLevel') ?? defaultLevel
    : defaultLevel;

  const { subscribe, set, update } = writable<string>(initialValue);

  return {
    subscribe,
    set: (value: string) => {
      if (browser) {
        localStorage.setItem('selectedLevel', value);
      }
      set(value);
    },
    reset: () => {
      if (browser) {
        localStorage.removeItem('selectedLevel');
      }
      set(defaultLevel);
    }
  };
}

export const selectedLevel = createLevelStore();