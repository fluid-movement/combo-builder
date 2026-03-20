import movesData from "$lib/data/moves.json";
import { parseMovesArray } from "$lib/schemas/move";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load: LayoutLoad = () => {
  try {
    const moves = parseMovesArray(movesData);
    return { moves };
  } catch (error) {
    console.error("Invalid move data:", error);
    throw new Error("Failed to load moves data");
  }
};
