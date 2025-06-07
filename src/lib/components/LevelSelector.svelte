<script lang="ts">
  import {selectedLevel} from "$lib/stores/levelStore";
  import {Button} from "$lib/components/ui/button";
  import {MOVE_LEVELS} from '$lib/schemas/move';
  import {ucFirst} from "$lib/utils";
  import {slide, fade} from "svelte/transition";
  import {Settings} from "@lucide/svelte";
  import * as Popover from "$lib/components/ui/popover";
  import type {Move} from "$lib/schemas/move";
  import {buttonVariants} from "$lib/components/ui/button";

  let {moves}: { moves: Move[] } = $props();

  let sortedMoves = $derived(moves.sort((a, b) => {
    const levelDiff = MOVE_LEVELS.indexOf(b.level) - MOVE_LEVELS.indexOf(a.level);
    if (levelDiff !== 0) return levelDiff;
    return a.name.localeCompare(b.name);
  }));

  let open = $state(false);
</script>

<section class="flex flex-col gap-4">
    <div class="flex gap-2 justify-between items-center">
        <h2 class="grow">
            {open
              ? "Select your level"
              : `Level: ${ucFirst($selectedLevel ?? '')}`}
        </h2>
        {#if !open}
            <div transition:fade={{ duration: 50}}>
                <Popover.Root>
                    <Popover.Trigger
                            class={buttonVariants({ variant: "default" })}
                            aria-label="View Moves">
                        Moves
                    </Popover.Trigger>
                    <Popover.Content
                            class="max-h-[75vh] overflow-y-auto border-primary bg-transparent backdrop-blur-lg">
                        <ul>
                            {#each sortedMoves as move}
                                <li>{move.name} ({move.level})</li>
                            {/each}
                        </ul>
                    </Popover.Content>
                </Popover.Root>
            </div>
        {/if}
        <Button onclick={() => open = !open} aria-label="Toggle Level Selector">
            <Settings/>
        </Button>
    </div>
    {#if open}
        <div transition:slide={{ duration: 100}}>
            {#if $selectedLevel}
                <div class="flex flex-wrap gap-2">
                    {#each MOVE_LEVELS as level}
                        <Button onclick={() => {selectedLevel.set(level); open = false;}}
                                variant={$selectedLevel === level ? 'default' : 'ghost'}
                                aria-label={`Select Move Level: ${level}`}>
                            {ucFirst(level)}
                        </Button>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</section>
