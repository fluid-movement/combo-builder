import type {Move, MoveType} from "$lib/schemas/move";

export type PickedMove = {
  move: Move;
  asType: MoveType;
};

export class MovePicker {
  #choices: Move[];
  list: PickedMove[] = $state([]);

  constructor(choices: Move[]) {
    this.#choices = [...choices];
  }

  get available(): Move[] {
    const selectedIds = new Set(this.list.map(p => p.move.id));
    return this.#choices.filter(move => !selectedIds.has(move.id));
  }

  pickCatch(): void {
    if (this.list.length > 0) return;

    const catches = this.available.filter(move => move.type.includes("catch"));
    if (catches.length === 0) return;
    const idx = Math.floor(Math.random() * catches.length);
    const move = catches[idx];
    this.list.push({move, asType: "catch"});
  }

  pickNextMove(type: MoveType): void {
    if (this.list.length === 0) return; // need catch first!
    const candidates = this.available.filter(move => move.type.includes(type));
    if (candidates.length === 0) return;
    const idx = Math.floor(Math.random() * candidates.length);
    const move = candidates[idx];
    this.list.push({move, asType: type});
  }

  isFresh(): boolean {
    return this.list.length === 0;
  }

  hasAvailable(type?: MoveType): boolean {
    if (!type) return this.available.length > 0;
    return this.available.some(move => move.type.includes(type));
  }

  reset(): void {
    this.list.length = 0;
  }
}
