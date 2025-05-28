import { z } from 'zod';

// Define the valid values
const MoveTypeSchema = z.enum(['catch', 'move', 'throw']);
const MoveLevelSchema = z.enum(['beginner', 'advanced', 'pro']);

// Schema for raw JSON data
export const MoveDataSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.string(), // Will be parsed as comma-separated
  level: MoveLevelSchema,
  description: z.string(),
  video: z.string().url(),
});

// Infer types from schemas
export type MoveLevel = z.infer<typeof MoveLevelSchema>;
export type MoveType = z.infer<typeof MoveTypeSchema>;
export type MoveData = z.infer<typeof MoveDataSchema>;

// Export the enums for use in components
export const MOVE_LEVELS = MoveLevelSchema.options;
export const MOVE_TYPES = MoveTypeSchema.options;

// Validation functions
export function parseMoveData(data: unknown): MoveData {
  return MoveDataSchema.parse(data);
}

export function parseMovesArray(data: unknown): MoveData[] {
  return z.array(MoveDataSchema).parse(data);
}