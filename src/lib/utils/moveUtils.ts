import type {Move, MoveLevel, MoveType} from '$lib/schemas/move';
import {MOVE_LEVELS} from '$lib/schemas/move';

// Level hierarchy and utilities
export const LEVEL_HIERARCHY = MOVE_LEVELS;

export function getLevelIndex(level: MoveLevel): number {
  return LEVEL_HIERARCHY.indexOf(level);
}

// Filtering functions
export function getMovesForLevel<T extends { level: MoveLevel }>(
  allMoves: T[],
  targetLevel: MoveLevel
): T[] {
  const targetIndex = getLevelIndex(targetLevel);
  if (targetIndex === -1) return allMoves;

  return allMoves.filter(move => {
    const moveIndex = getLevelIndex(move.level);
    return moveIndex <= targetIndex;
  });
}

export function getMovesWithType<T extends { type: MoveType[] }>(
  allMoves: T[],
  targetType: MoveType
): T[] {
  return allMoves.filter(move => hasType(move, targetType));
}

// Type checking functions
export function hasType(move: { type: MoveType[] }, type: MoveType): boolean {
  return move.type.includes(type);
}

// Data normalization functions
export function normalizeMove(data: Move): Required<Move> {
  return {
    ...data,
    alternateNames: data.alternateNames || []
  };
}

export function normalizeMoves(data: Move[]): Required<Move>[] {
  return data.map(normalizeMove);
}

// Extraction utilities
export function getUniqueLevels(moves: Move[]): MoveLevel[] {
  return [...new Set(moves.map(move => move.level))];
}

export function getUniqueTypes(moves: Move[]): MoveType[] {
  return [...new Set(moves.flatMap(move => move.type))];
}

// Search functionality
export function searchMoves(moves: Move[], searchTerm: string): Move[] {
  const term = searchTerm.toLowerCase();
  return moves.filter(move =>
    move.name.toLowerCase().includes(term) ||
    move.description.toLowerCase().includes(term) ||
    (move.alternateNames && move.alternateNames.some(alt =>
      alt.toLowerCase().includes(term)
    ))
  );
}