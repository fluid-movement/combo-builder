import type {MoveLevel} from '$lib/schemas/move';
import {MOVE_LEVELS} from '$lib/schemas/move';

export function getMovesForLevel<T extends { level: MoveLevel }>(
  allMoves: T[],
  targetLevel: MoveLevel|undefined
): T[] {
  if (targetLevel === undefined) return [];

  const targetIndex = MOVE_LEVELS.indexOf(targetLevel);
  if (targetIndex === -1) return allMoves;

  return allMoves.filter(move => {
    const moveIndex = MOVE_LEVELS.indexOf(move.level);
    return moveIndex <= targetIndex;
  });
}