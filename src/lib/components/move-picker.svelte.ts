import type {Move} from "$lib/types";

export class MovePicker {
  #choices: Move[];
  list: Move[] = $state([]);

  get available(): Move[] {
    const selectedIds = new Set(this.list.map(move => move.id));
    return this.#choices.filter(move => !selectedIds.has(move.id));
  }

  constructor(choices: Move[]) {
    this.#choices = [...choices];
  }

  random(): void {
    const available = this.available;
    if (available.length === 0) return;

    const idx = Math.floor(Math.random() * available.length);
    const selected = available[idx];
    this.list.push(selected);
  }

  isFresh(): boolean
  {
    return this.list.length === 0;
  }

  hasAvailable(): boolean {
    return this.available.length > 0;
  }

  reset(): void {
    this.list.length = 0;
  }
}