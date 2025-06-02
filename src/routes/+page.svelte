<script lang="ts">
  import {MovePicker} from "$lib/utils/move-picker.svelte.js";
  import {Button} from "$lib/components/ui/button";
  import {selectedLevel} from '$lib/stores/levelStore';
  import {slide} from "svelte/transition";
  import type {Move} from "$lib/schemas/move";
  import {getMovesForLevel} from "$lib/utils/move-filter";
  import MoveCard from "$lib/components/MoveCard.svelte";
  import {RotateCcw} from "@lucide/svelte";
  import {Plus} from "@lucide/svelte";
  import LevelSelector from "$lib/components/LevelSelector.svelte";

  let {data} = $props();
  let moves: Move[] = data.moves;
  let filteredMoves = $derived(getMovesForLevel(moves, $selectedLevel));
  let picker = $derived(new MovePicker(filteredMoves));
</script>

<main class="flex flex-col gap-8">
    <LevelSelector moves={filteredMoves}/>
    <section class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
            <h2 class="font-bold text-xl">

                {#if picker.isFresh()}Add a catch{:else}Add a move or modifier{/if}
            </h2>
            <Button onclick={() => picker.reset()} disabled={picker.isFresh()}>
                <RotateCcw/>
            </Button>
        </div>
        <div class="flex flex-wrap gap-4">
            <Button onclick={() => picker.pickCatch()}
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
                <div transition:slide={{ duration: 100}}>
                    <MoveCard {pickedMove}/>
                </div>
            {/each}
        </div>
    </section>
</main>