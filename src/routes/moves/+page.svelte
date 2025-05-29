<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import type {Move} from "$lib/schemas/move";
  import {selectedLevel} from '$lib/stores/levelStore';
  import {fade} from "svelte/transition";

  let {data} = $props();
  let moves: Move[] = data.moves;

  let levels = new Set(moves.map(move => move.level));

  let filteredMoves = $derived(
    moves.filter(move => move.level === $selectedLevel)
  );
</script>

<main>
    <div class="flex gap-4 mb-4">
        {#each levels as level}
            <Button onclick={() => selectedLevel.set(level)}
                    variant={$selectedLevel === level ? 'default' : 'outline'}>
                {level}
            </Button>
        {/each}
    </div>
    <ul class="flex flex-col gap-4">
        {#each filteredMoves as move}
            <li transition:fade={{ duration: 100 }}>
                <strong>{move.name}</strong>
                <p>{move.description}</p>
            </li>
        {/each}
    </ul>
</main>
