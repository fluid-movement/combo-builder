<script lang="ts">
  import { MovePicker } from "$lib/utils/move-picker.svelte.js";
  import Button from "$lib/components/Button.svelte";
  import { selectedLevel } from "$lib/stores/levelStore";
  import { slide, fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { MOVE_LEVELS, type Move } from "$lib/schemas/move";
  import { getMovesForLevel } from "$lib/utils/move-filter";
  import MoveCard from "$lib/components/MoveCard.svelte";
  import { RotateCcw } from "@lucide/svelte";
  import { Plus } from "@lucide/svelte";

  let { data } = $props();
  let moves = $derived(data.moves);
  let filteredMoves = $derived(getMovesForLevel(moves, $selectedLevel));
  let picker = $derived(new MovePicker(filteredMoves));
</script>

<svelte:head>
  <title>Combo Builder</title>
  <meta
    name="description"
    content="A combo building game for Freestyle Frisbee."
  />
</svelte:head>

<div class="grid overflow-hidden">
  {#if picker.isFresh()}
    <div
      in:fly={{ x: -300, duration: 350, delay: 150, easing: cubicOut }}
      out:fly={{ x: -300, duration: 350, easing: cubicOut }}
      class="col-start-1 row-start-1 flex flex-col min-h-[calc(100dvh-5rem)]"
    >
      <div class="mt-auto flex flex-col gap-4 pb-6">
        <Button
          class="text-xl"
          onclick={() => picker.pickCatch()}
          variant="dashed"><Plus />Tap to start your combo</Button
        >
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
      </div>
    </div>
  {:else}
    <div
      in:fly={{ x: 300, duration: 350, delay: 150, easing: cubicOut }}
      out:fly={{ x: 300, duration: 350, easing: cubicOut }}
      class="col-start-1 row-start-1 flex flex-col gap-4"
    >
      <div class="flex flex-col gap-4 pb-56">
        {#each picker.list as pickedMove}
          <div in:fly={{ x: 300, duration: 350, easing: cubicOut }}>
            <MoveCard {pickedMove} />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

{#if !picker.isFresh()}
  <div
    transition:fade={{ duration: 300 }}
    class="fixed bottom-0 left-0 right-0 bg-background px-4 pt-2 pb-6 flex flex-col gap-3 max-w-3xl mx-auto sm:px-6 lg:px-8"
  >
    <div class="flex gap-3">
      <Button
        onclick={() => picker.pickNextMove("move")}
        disabled={!picker.hasAvailable("move")}
        aria-label="Pick Move"
        class="flex-1"
      >
        <Plus /> Move
      </Button>
      <Button
        onclick={() => picker.pickNextMove("modifier")}
        disabled={!picker.hasAvailable("modifier")}
        aria-label="Pick Modifier"
        class="flex-1"
      >
        <Plus /> Modifier
      </Button>
    </div>
    <Button onclick={() => picker.reset()} aria-label="Reset Picker">
      <RotateCcw /> Reset
    </Button>
  </div>
{/if}
