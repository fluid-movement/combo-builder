<script lang="ts">
  import type {PickedMove} from "$lib/utils/move-picker.svelte";
  import {ChevronUp, ChevronDown} from "@lucide/svelte";
  import {slide} from "svelte/transition";
  import MoveDetails from "$lib/components/MoveDetails.svelte";

  let {pickedMove}: {pickedMove: PickedMove} = $props();

  let styleClass = $derived(
    pickedMove.asType === 'catch'
      ? 'font-bold'
      : pickedMove.asType === 'move'
        ? 'italic text-blue-700'
        : pickedMove.asType === 'modifier'
          ? 'underline text-yellow-700'
          : ''
  );

  let expanded = $state(false);
</script>


<div class="p-4 border border-primary bg-background rounded-lg ">
    <div class="{styleClass} flex justify-between gap-4">
        <div class="grow">{pickedMove.move.name}</div>
        <small>({pickedMove.asType})</small>
        {#if expanded}
            <ChevronUp class="text-primary cursor-pointer" onclick={() => expanded = !expanded}/>

        {:else}
            <ChevronDown class="text-primary cursor-pointer" onclick={() => expanded = !expanded}/>
        {/if}
    </div>
    {#key expanded}
        <div class={[expanded ? 'block' : 'hidden']} transition:slide>
            <MoveDetails move={pickedMove.move}/>
        </div>
    {/key}
</div>
