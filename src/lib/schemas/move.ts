import {z} from 'zod';

const MoveLevelSchema = z.enum(['beginner', 'advanced', 'pro', 'specialist']);
const MoveTypeSchema = z.enum(['catch', 'move', 'modifier']);

// Schema for raw JSON data
export const MoveSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  alternateNames: z.array(z.string()).optional(),
  type: z.array(MoveTypeSchema),
  level: MoveLevelSchema,
  description: z.string().optional(),
  videoId: z.string().optional(),
});

// Infer types from schemas - single source of truth
export type MoveLevel = z.infer<typeof MoveLevelSchema>;
export type MoveType = z.infer<typeof MoveTypeSchema>;
export type Move = z.infer<typeof MoveSchema>;

export const MOVE_LEVELS = MoveLevelSchema.options;
export const MOVE_TYPES = MoveTypeSchema.options;

export function parseMove(data: unknown): Move {
  return MoveSchema.parse(data);
}

export function parseMovesArray(data: unknown): Move[] {
  return z.array(MoveSchema).parse(data);
}