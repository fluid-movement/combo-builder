<script lang="ts">
  import type { Move } from "$lib/schemas/move";
  import { selectedLevel } from "$lib/stores/levelStore";
  import * as Accordion from "$lib/components/ui/accordion";
  import Button from "$lib/components/Button.svelte";
  import MoveDetails from "$lib/components/MoveDetails.svelte";
  import { MOVE_LEVELS } from "$lib/schemas/move";

  let { data } = $props();
  let moves = $derived(data.moves);

  let openItem = $state<string | undefined>(undefined);

  let filteredMoves = $derived(
    moves
      .filter((move) => move.level === $selectedLevel)
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      }),
  );
</script>

<svelte:head>
  <title>Move Archive</title>
  <meta
    name="description"
    content="A page documenting all the moves used in the combo builder, filtered by move level."
  />
</svelte:head>

{#if $selectedLevel}
  <div class="grid grid-cols-2 gap-2">
    {#each MOVE_LEVELS as level}
      <Button
        class="capitalize"
        aria-pressed={$selectedLevel === level}
        aria-label={`Select ${level} moves`}
        onclick={() => {
          selectedLevel.set(level);
        }}
      >
        {level}
      </Button>
    {/each}
  </div>
{/if}
<ul class="flex flex-col gap-4">
  <Accordion.Root type="single" class="w-full" bind:value={openItem}>
    {#each filteredMoves as move}
      {@const hasContent = !!(move.description || move.videoId)}
      <Accordion.Item value={move.id}>
        {#if hasContent}
          <Accordion.Trigger class="font-bold">
            {move.name}
          </Accordion.Trigger>
          <Accordion.Content>
            <MoveDetails {move} stopPlayback={openItem !== move.id} />
          </Accordion.Content>
        {:else}
          <div class="flex flex-1 items-start py-4 text-left text-sm font-bold">
            {move.name}
          </div>
        {/if}
      </Accordion.Item>
    {/each}
  </Accordion.Root>
</ul>
