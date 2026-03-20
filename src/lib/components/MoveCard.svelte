<script lang="ts">
  import type { PickedMove } from "$lib/utils/move-picker.svelte";
  import { ChevronDown } from "@lucide/svelte";
  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import MoveDetails from "$lib/components/MoveDetails.svelte";

  let { pickedMove }: { pickedMove: PickedMove } = $props();
  let expanded = $state(false);
</script>

<div class="rounded-xl border-2 border-primary bg-card overflow-hidden">
  <button
    class="w-full flex items-center gap-3 px-4 py-3 text-left"
    onclick={() => (expanded = !expanded)}
    aria-expanded={expanded}
  >
    <span class="w-1 self-stretch rounded-full bg-primary shrink-0"></span>
    <div class="grow">
      <p class="font-bold text-lg leading-tight">{pickedMove.move.name}</p>
      <p class="text-xs text-muted-foreground capitalize"><span class="font-bold">{pickedMove.asType}</span> · {pickedMove.move.level}</p>
    </div>
    {#if pickedMove.move.description || pickedMove.move.videoId}
      <ChevronDown
        class="text-primary transition-transform duration-300 shrink-0 {expanded ? 'rotate-180' : ''}"
      />
    {/if}
  </button>
  {#if expanded && (pickedMove.move.description || pickedMove.move.videoId)}
    <div transition:slide={{ duration: 250, easing: cubicOut }} class="px-4 py-2 border-t-2 border-primary/20">
      <MoveDetails move={pickedMove.move} stopPlayback={!expanded} />
    </div>
  {/if}
</div>
