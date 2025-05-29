<script lang="ts">
  import type {PickedMove} from "$lib/utils/move-picker.svelte";

  export let pickedMove: PickedMove;
</script>

{#if pickedMove.asType === 'catch'}
    <div class="p-4 border border-green-500 bg-green-50 rounded-lg">
        <span class="font-bold text-green-700">{pickedMove.move.name} <small>(Catch)</small></span>
    </div>
{:else if pickedMove.asType === 'move'}
    <div class="p-4 border border-blue-500 bg-blue-50 rounded-lg">
        <span class="italic text-blue-700">{pickedMove.move.name} <small>(Move)</small></span>
    </div>
{:else if pickedMove.asType === 'modifier'}
    <div class="p-4 border border-yellow-500 bg-yellow-50 rounded-lg">
        <span class="underline text-yellow-700">{pickedMove.move.name} <small>(Modifier)</small></span>
    </div>
{/if}
