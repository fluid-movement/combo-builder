<script lang="ts">
  import { MovePicker } from "$lib/utils/move-picker.svelte.js";
  import Button from "$lib/components/Button.svelte";
  import { selectedLevel } from "$lib/stores/levelStore";
  import { getMovesForLevel } from "$lib/utils/move-filter";
  import MoveCard from "$lib/components/MoveCard.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import DifficultySelector from "$lib/components/DifficultySelector.svelte";
  import { RotateCcw, Plus } from "$icons";
  import { gameStarted } from "$lib/stores/gameStore";

  let { data } = $props();
  let moves = $derived(data.moves);
  let filteredMoves = $derived(getMovesForLevel(moves, $selectedLevel));
  let picker = $derived(new MovePicker(filteredMoves));

  $effect(() => {
    gameStarted.set(!picker.isFresh());
  });

  let lastPickTime = 0;

  function pickMove(type: "move" | "modifier") {
    const now = Date.now();
    if (now - lastPickTime < 200) return;
    lastPickTime = now;
    picker.pickNextMove(type);
  }

  function transitionWith(direction: "forward" | "back", action: () => void) {
    if (typeof document === "undefined" || !document.startViewTransition) {
      action();
      return;
    }
    document.documentElement.dataset.navDirection = direction;
    document.startViewTransition(action);
  }

  function scrollIntoView(node: HTMLElement) {
    requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: "instant", block: "end" });
    });
  }
</script>

<svelte:head>
  <title>Combo Builder</title>
  <meta
    name="description"
    content="A combo building game for Freestyle Frisbee."
  />
</svelte:head>

<div class="grid min-h-full">
  {#if picker.isFresh()}
    <div
      class="col-start-1 row-start-1 flex justify-between flex-col min-h-full overflow-hidden"
    >
      <!-- Logo -->
      <div class="text-center pt-14">
        <Logo size="lg" />
      </div>

      <!-- Menu -->
      <div class="flex flex-col gap-3 bg-button/50 rounded-2xl p-4">
        <Button
          class="text-3xl"
          onclick={() => transitionWith("forward", () => picker.pickCatch())}
          variant="dashed"
        >
          <Plus />Tap to start your combo
        </Button>
        <div class="flex flex-col gap-2">
          <span
            class="text-xs font-semibold uppercase tracking-widest text-center opacity-50"
            >Difficulty</span
          >
          <DifficultySelector />
        </div>
      </div>
    </div>
  {:else}
    <div class="col-start-1 row-start-1 flex flex-col gap-4">
      <!-- Mini logo -->
      <Logo size="sm" />
      <div class="flex flex-col gap-4 pb-56 overflow-x-clip">
        {#each picker.list as pickedMove (pickedMove.move.id)}
          <div class="move-card-enter" use:scrollIntoView>
            <MoveCard {pickedMove} />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

{#if !picker.isFresh()}
  <div
    class="fixed bottom-0 left-0 right-0 bg-background px-4 pt-2 pb-6 flex flex-col gap-3 max-w-3xl mx-auto sm:px-6 lg:px-8"
  >
    <div class="bg-button/50 rounded-2xl p-1.5 flex gap-1.5 shadow-lg">
      <Button
        onclick={() => pickMove("move")}
        disabled={!picker.hasAvailable("move")}
        aria-label="Pick Move"
        variant="primary"
        class="flex-1 py-4 text-primary-background"
      >
        <Plus /> Move
      </Button>
      <Button
        onclick={() => pickMove("modifier")}
        disabled={!picker.hasAvailable("modifier")}
        aria-label="Pick Modifier"
        class="flex-1 py-4"
      >
        <Plus /> Modifier
      </Button>
    </div>
    <div class="flex justify-center">
      <Button
        onclick={() => transitionWith("back", () => picker.reset())}
        aria-label="Reset Picker"
        variant="ghost"
        class="text-sm px-8"
      >
        <RotateCcw size="14" /> Reset
      </Button>
    </div>
  </div>
{/if}
