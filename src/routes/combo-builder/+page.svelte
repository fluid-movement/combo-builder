<script lang="ts">
  import {MovePicker} from "$lib/components/move-picker.svelte";
  import {Button} from "$lib/components/ui/button";
  import {Move} from "$lib/models/move";
  import {selectedLevel} from '$lib/stores/levelStore';
  import {fade} from "svelte/transition";

  let {data} = $props();

  let moves: Move[] = Move.fromJsonArray(data.moves);

  let levels = new Set(moves.map(move => move.level));

  let filteredMoves = $derived(Move.getMovesForLevel(moves, $selectedLevel));

  let picker = $derived(new MovePicker(filteredMoves));
</script>

<section class="flex flex-col gap-4">
    <h1>Combo Builder</h1>
    <div class="flex gap-4">
        {#each levels as level}
            <Button onclick={() => selectedLevel.set(level)}
                    variant={$selectedLevel === level ? 'default' : 'outline'}>
                {level}
            </Button>
        {/each}
    </div>
    <p class="hidden">Moves: <span>{filteredMoves.map((move) => move.name)}</span></p>
    <h2>Lets go:</h2>
    <div class="flex gap-4">
        <Button onclick={() => picker.random()}>Add Move</Button>
        <Button onclick={() => picker.reset()} disabled={picker.isFresh()}>Reset</Button>
    </div>
    <div class="flex flex-col gap-2">
        {#each picker.list as move}
            <div transition:fade={{ duration: 100}} class="p-4 border border-stone-300 rounded-lg hover:bg-stone-100">
                {move.name}
            </div>
        {/each}
    </div>
</section>