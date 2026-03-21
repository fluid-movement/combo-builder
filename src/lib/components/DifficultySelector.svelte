<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { MOVE_LEVELS } from "$lib/schemas/move";
  import { selectedLevel } from "$lib/stores/levelStore";
  import { Check } from "$icons";
</script>

<div class="flex flex-col gap-2 bg-button/50 rounded-2xl p-4">
  <span class="text-xs font-semibold uppercase tracking-widest text-center opacity-50">
    Difficulty
  </span>
  <div class="grid grid-cols-2 gap-2">
    {#each MOVE_LEVELS as level (level)}
      <Button
        class="capitalize gap-1.5"
        aria-pressed={$selectedLevel === level}
        aria-label={`Select ${level} moves`}
        onclick={() => selectedLevel.set(level)}
      >
        {#if $selectedLevel === level}
          <Check size="16" strokeWidth={3} />
        {/if}
        {level}
      </Button>
    {/each}
  </div>
</div>
