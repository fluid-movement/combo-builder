<script lang="ts">
  import type {Move} from "$lib/schemas/move";
  import {selectedLevel} from '$lib/stores/levelStore';
  import {fade} from "svelte/transition";
  import LevelSelector from "$lib/components/LevelSelector.svelte";
  import * as Accordion from "$lib/components/ui/accordion";
  import MoveDetails from "$lib/components/MoveDetails.svelte";

  let {data} = $props();
  let moves: Move[] = data.moves;

  let filteredMoves = $derived(
    moves.filter(move => move.level === $selectedLevel)
  );
</script>

<main>
    <LevelSelector {moves}/>
    <ul class="mt-8 flex flex-col gap-4">
        <Accordion.Root type="single" class="w-full sm:max-w-[70%]">
            {#each filteredMoves as move}
                <Accordion.Item value={move.id}>
                    <Accordion.Trigger>{move.name}</Accordion.Trigger>
                    <Accordion.Content>
                        <MoveDetails {move}/>
                    </Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    </ul>
</main>
