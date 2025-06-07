<script lang="ts">
  import type {Move} from "$lib/schemas/move";
  import {selectedLevel} from '$lib/stores/levelStore';
  import * as Accordion from "$lib/components/ui/accordion";
  import {Button} from "$lib/components/ui/button";
  import MoveDetails from "$lib/components/MoveDetails.svelte";
  import {MOVE_LEVELS} from '$lib/schemas/move';
  import {ucFirst} from "$lib/utils";

  let {data} = $props();
  let moves: Move[] = data.moves;

  let filteredMoves = $derived(
    moves.filter(move => move.level === $selectedLevel).sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
  );
</script>

<svelte:head>
    <title>Move Archive</title>
    <meta name="description" content="A page documenting all the moves used in the combo builder, filtered by move level." />
</svelte:head>

<main>
    {#if $selectedLevel}
        <div class="flex flex-wrap gap-2">
            {#each MOVE_LEVELS as level}
                <Button onclick={() => selectedLevel.set(level)}
                        variant={$selectedLevel === level ? 'default' : 'ghost'}
                        aria-label="Select Move Level">
                    {ucFirst(level)}
                </Button>
            {/each}
        </div>
    {/if}
    <ul class="mt-8 flex flex-col gap-4">
        <Accordion.Root type="single" class="w-full sm:max-w-[70%]">
            {#each filteredMoves as move}
                <Accordion.Item value={move.id}>
                    <Accordion.Trigger class="font-bold">{move.name}</Accordion.Trigger>
                    <Accordion.Content>
                        <MoveDetails {move}/>
                    </Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    </ul>
</main>
