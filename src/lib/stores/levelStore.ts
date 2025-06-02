import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { MoveLevel } from '$lib/schemas/move';
import { MOVE_LEVELS } from '$lib/schemas/move';

function createLevelStore() {
  const defaultLevel: MoveLevel = 'beginner'; // Type-safe default

  // Validate stored value against schema
  function getValidatedStoredLevel(): MoveLevel {
    if (!browser) return defaultLevel;

    const stored = localStorage.getItem('selectedLevel');
    if (!stored) return defaultLevel;

    // Type-safe validation - only accept valid MoveLevel values
    return MOVE_LEVELS.includes(stored as MoveLevel)
      ? (stored as MoveLevel)
      : defaultLevel;
  }

  // Start with undefined to avoid flashing default before correct value loads
  const { subscribe, set, update } = writable<MoveLevel | undefined>(undefined);

  if (browser) {
    // Set the correct value on the client after hydration
    set(getValidatedStoredLevel());
  }

  return {
    subscribe,
    set: (value: MoveLevel) => {
      // Type safety ensures only valid MoveLevel values can be passed
      if (browser) {
        localStorage.setItem('selectedLevel', value);
      }
      set(value);
    },
    update: (updater: (value: MoveLevel) => MoveLevel) => {
      update((currentValue) => {
        const newValue = updater(currentValue as MoveLevel);
        if (browser) {
          localStorage.setItem('selectedLevel', newValue);
        }
        return newValue;
      });
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
