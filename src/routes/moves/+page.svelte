<script lang="ts">
  import type { Move } from "$lib/schemas/move";
  import { selectedLevel } from "$lib/stores/levelStore";
  import * as Accordion from "$lib/components/ui/accordion";
  import MoveDetails from "$lib/components/MoveDetails.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import DifficultySelector from "$lib/components/DifficultySelector.svelte";

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
  <title>The Move Library</title>
  <meta
    name="description"
    content="A page documenting all the moves used in the combo builder, filtered by move level."
  />
</svelte:head>

{#snippet moveDetails(move: Move)}
  <div class="flex gap-4 items-center">
    <span class="font-bold">{move.name}</span>
    <div class="text-xs text-muted capitalize">
      {move.type}
    </div>
  </div>
{/snippet}
<Logo size="sm" />
<h1 class="text-3xl font-bold mb-4 mt-4 text-center">The Move Library</h1>
<div class="flex flex-col gap-2 bg-button/50 rounded-2xl p-4">
  <span
    class="text-xs font-semibold uppercase tracking-widest text-center opacity-50"
  >
    Difficulty
  </span>
  <DifficultySelector />
</div>
<ul class="flex flex-col gap-4">
  <Accordion.Root type="single" class="w-full" bind:value={openItem}>
    {#each filteredMoves as move (move.id)}
      {@const hasContent = !!(move.description || move.videoId)}
      <Accordion.Item value={move.id}>
        {#if hasContent}
          <Accordion.Trigger>
            {@render moveDetails(move)}
          </Accordion.Trigger>
          <Accordion.Content>
            <MoveDetails {move} stopPlayback={openItem !== move.id} />
          </Accordion.Content>
        {:else}
          <div class="py-4 text-left text-sm">
            {@render moveDetails(move)}
          </div>
        {/if}
      </Accordion.Item>
    {/each}
  </Accordion.Root>
</ul>
