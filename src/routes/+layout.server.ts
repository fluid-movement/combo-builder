import movesData from '$lib/data/moves.json';
import { parseMovesArray } from '$lib/schemas/move';

export function load() {
  try {
    const moves = parseMovesArray(movesData);
    return { moves };
  } catch (error) {
    console.error('Invalid move data:', error);
    throw new Error('Failed to load moves data');
  }
}