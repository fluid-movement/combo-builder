import type { MoveLevel, MoveType, MoveData } from '$lib/schemas/move';

export class Move {
  public readonly types: MoveType[];
  public readonly level: MoveLevel;

  constructor(
    public id: string,
    public name: string,
    typeString: string,
    level: MoveLevel,
    public description: string,
    public video: string
  ) {
    // Parse comma-separated types and validate
    this.types = typeString
      .split(',')
      .map(t => t.trim())
      .filter((t): t is MoveType =>
        ['catch', 'move', 'throw'].includes(t as MoveType)
      );

    this.level = level;
  }

  private static levelHierarchy: MoveLevel[] = ['beginner', 'advanced', 'pro'];

  static getLevelIndex(level: MoveLevel): number {
    return this.levelHierarchy.indexOf(level);
  }

  static getMovesForLevel(allMoves: Move[], targetLevel: MoveLevel): Move[] {
    const targetIndex = this.getLevelIndex(targetLevel);
    if (targetIndex === -1) return allMoves;

    return allMoves.filter(move => {
      const moveIndex = this.getLevelIndex(move.level);
      return moveIndex <= targetIndex;
    });
  }

  static getMovesWithType(allMoves: Move[], targetType: MoveType): Move[] {
    return allMoves.filter(move => move.hasType(targetType));
  }

  hasType(type: MoveType): boolean {
    return this.types.includes(type);
  }

  static fromJson(data: MoveData): Move {
    return new Move(
      data.id,
      data.name,
      data.type,
      data.level,
      data.description,
      data.video
    );
  }

  static fromJsonArray(data: MoveData[]): Move[] {
    return data.map(item => Move.fromJson(item));
  }
}