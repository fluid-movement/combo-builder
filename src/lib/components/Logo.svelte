<script lang="ts">
  import { Dices } from "$icons";

  let { size = "lg" }: { size?: "lg" | "sm" } = $props();
</script>

{#if size === "lg"}
  <div class="text-7xl font-bold">
    <span class="inline-flex gap-1 items-baseline">C<Dices size="40" />mbo</span>Builder
  </div>
  <p class="mt-2 text-base font-medium opacity-50 tracking-wide">
    Ready for your next move?
  </p>
{:else}
  <div class="text-2xl font-bold text-center pt-4 opacity-60">
    <span class="inline-flex gap-0.5 items-baseline">C<Dices size="14" />mbo</span>Builder
  </div>
{/if}
