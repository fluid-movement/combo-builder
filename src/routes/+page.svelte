<script lang="ts">
  import {MovePicker} from "$lib/utils/move-picker.svelte.js";
  import {Button} from "$lib/components/ui/button";
  import {selectedLevel} from '$lib/stores/levelStore';
  import {fade} from "svelte/transition";
  import type {Move} from "$lib/schemas/move";
  import {getMovesForLevel, getUniqueLevels} from "$lib/utils/moveUtils";
  import MoveCard from "$lib/components/MoveCard.svelte";
  import {RotateCcw} from "@lucide/svelte";
  import {Plus} from "@lucide/svelte";
  import * as Popover from "$lib/components/ui/popover";

  let {data} = $props();
  let moves: Move[] = data.moves;
  let levels = getUniqueLevels(moves);
  let filteredMoves = $derived(getMovesForLevel(moves, $selectedLevel));
  let picker = $derived(new MovePicker(filteredMoves));
</script>

<main class="flex flex-col gap-8">
    <section class="flex flex-col gap-4">
        <h2 class="font-bold text-2xl">Select your level</h2>
        <div class="flex flex-wrap gap-4">
            {#each levels as level}
                <Button onclick={() => selectedLevel.set(level)}
                        variant={$selectedLevel === level ? 'default' : 'outline'}>
                    {level}
                </Button>
            {/each}
            <Popover.Root>
                <Popover.Trigger>
                    <Button variant="outline">Show moves</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <p>{filteredMoves.map((move) => " " + move.name)}</p>
                </Popover.Content>
            </Popover.Root>
        </div>
    </section>

    <section class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
            <h2 class="font-bold text-2xl">
                {#if picker.isFresh()}Add a catch{:else}Add a move or modifier{/if}
            </h2>
            <Button onclick={() => picker.reset()} disabled={picker.isFresh()}>
                <RotateCcw/>
            </Button>
        </div>
        <div class="flex flex-wrap gap-4">
            <Button onclick={() => picker.pickFirstCatch()}
                    disabled={!picker.isFresh()}
                    variant={picker.isFresh() && picker.hasAvailable('catch') ? 'default' : 'ghost'}>
                <Plus/>
                Catch
            </Button>
            <Button onclick={() => picker.pickNextMove('move')}
                    disabled={picker.isFresh() || !picker.hasAvailable('move')}
                    variant={!picker.isFresh() && picker.hasAvailable('move') ? 'default' : 'ghost'}>
                <Plus/>
                Move
            </Button>
            <Button onclick={() => picker.pickNextMove('modifier')}
                    disabled={picker.isFresh() || !picker.hasAvailable('modifier')}
                    variant={!picker.isFresh() && picker.hasAvailable('modifier') ? 'default' : 'ghost'}>
                <Plus/>
                Modifier
            </Button>
        </div>
        <div class="flex flex-col gap-2">
            {#each picker.list as pickedMove}
                <div transition:fade={{ duration: 100}}>
                    <MoveCard {pickedMove}/>
                </div>
            {/each}
        </div>
    </section>
</main>
