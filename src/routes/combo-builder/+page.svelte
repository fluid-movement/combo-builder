<script lang="ts">
  import {MovePicker} from "$lib/utils/move-picker.svelte";
  import {Button} from "$lib/components/ui/button";
  import {selectedLevel} from '$lib/stores/levelStore';
  import {fade} from "svelte/transition";
  import type {Move} from "$lib/schemas/move";
  import {getMovesForLevel, getUniqueLevels} from "$lib/utils/moveUtils";
  import MoveCard from "$lib/components/MoveCard.svelte";
  import {RotateCcw} from "@lucide/svelte";
  import {Plus} from "@lucide/svelte";

  let {data} = $props();
  let moves: Move[] = data.moves;
  let levels = getUniqueLevels(moves);
  let filteredMoves = $derived(getMovesForLevel(moves, $selectedLevel));
  let picker = $derived(new MovePicker(filteredMoves));
</script>

<section class="flex flex-col gap-4">
    <h2 class="font-bold text-2xl">Select your level</h2>
    <div class="flex gap-4">
        {#each levels as level}
            <Button onclick={() => selectedLevel.set(level)}
                    variant={$selectedLevel === level ? 'default' : 'outline'}>
                {level}
            </Button>
        {/each}
    </div>
    <p class="text-stone-600">Moves: <span>{filteredMoves.map((move) => " " + move.name)}</span></p>
    <h2 class="font-bold text-2xl">Lets go!</h2>
    <div class="flex gap-4 justify-between md:justify-start">
        <Button onclick={() => picker.pickFirstCatch()}
                disabled={!picker.isFresh()}
                variant={picker.isFresh() && picker.hasAvailable('catch') ? 'default' : 'ghost'}
        >
            <Plus/>
            Catch
        </Button>
        <Button onclick={() => picker.pickNextMove('move')}
                disabled={picker.isFresh() || !picker.hasAvailable('move')}
                variant={!picker.isFresh() && picker.hasAvailable('move') ? 'default' : 'ghost'}
        >
            <Plus/>
            Move
        </Button>
        <Button onclick={() => picker.pickNextMove('modifier')}
                disabled={picker.isFresh() || !picker.hasAvailable('modifier')}
                variant={!picker.isFresh() && picker.hasAvailable('modifier') ? 'default' : 'ghost'}
        >
            <Plus/>
            Modifier
        </Button>
        <Button onclick={() => picker.reset()} disabled={picker.isFresh()}>
            <RotateCcw/>
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
