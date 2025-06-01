<script lang="ts">
  import {selectedLevel} from "$lib/stores/levelStore";
  import {Button} from "$lib/components/ui/button";
  import type {Move} from "$lib/schemas/move";
  import {getUniqueLevels} from "$lib/utils/moveUtils";

  let { moves }: {moves: Move[]} = $props();
  let levels = getUniqueLevels(moves);
</script>

<section class="flex flex-col gap-4">
    <h2 class="font-bold text-2xl">Select your level</h2>
    <div class="flex flex-wrap gap-4">
        {#each levels as level}
            <Button onclick={() => selectedLevel.set(level)}
                    variant={$selectedLevel === level ? 'default' : 'ghost'}>
                {level}
            </Button>
        {/each}
    </div>
</section>