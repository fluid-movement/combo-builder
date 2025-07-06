<script lang="ts">
  import type {PickedMove} from "$lib/utils/move-picker.svelte";
  import {ChevronUp, ChevronDown} from "@lucide/svelte";
  import {slide} from "svelte/transition";
  import MoveDetails from "$lib/components/MoveDetails.svelte";

  let {pickedMove}: {pickedMove: PickedMove} = $props();
  let expanded = $state(false);
</script>

<div class="border border-primary bg-primary rounded-lg ">
    <div class="flex items-center">
        <div class="p-4 grow text-lg text-primary-foreground">{pickedMove.move.name}</div>
        <small class="py-4 mr-4">({pickedMove.asType})</small>
        <button class="flex items-center justify-center w-14 h-14 border-l border-primary-foreground" onclick={() => expanded = !expanded}>
            {#if expanded}
                <ChevronUp class="text-primary-foreground"/>
            {:else}
                <ChevronDown class="text-primary-foreground"/>
            {/if}
        </button>
    </div>
    {#key expanded}
        <div class={[expanded ? 'block' : 'hidden', "p-4"]} transition:slide>
            <MoveDetails move={pickedMove.move} stopPlayback={!expanded}/>
        </div>
    {/key}
</div>