import { type } from 'arktype';

const MoveLevelSchema = type("'beginner'|'advanced'|'pro'|'specialist'");
const MoveTypeSchema = type("'catch'|'move'|'modifier'");

const MoveSchema = type({
  id: 'string > 0',
  name: 'string > 0',
  'alternateNames?': 'string[]',
  type: MoveTypeSchema.array(),
  level: MoveLevelSchema,
  'description?': 'string',
  'videoId?': 'string',
});

// Infer types from schemas - single source of truth
export type MoveLevel = typeof MoveLevelSchema.infer;
export type MoveType = typeof MoveTypeSchema.infer;
export type Move = typeof MoveSchema.infer;

// Extract the literal values for constants
export const MOVE_LEVELS = ['beginner', 'advanced', 'pro', 'specialist'] as const;
export const MOVE_TYPES = ['catch', 'move', 'modifier'] as const;

export function parseMovesArray(data: unknown): Move[] {
  const MovesArraySchema = MoveSchema.array();
  return MovesArraySchema.assert(data);
}