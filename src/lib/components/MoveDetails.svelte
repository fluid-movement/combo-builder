<script lang="ts">
  import type { Move } from "$lib/schemas/move";
  import LazyYouTube from "$lib/components/LazyYouTube.svelte";

  interface Props {
    move: Move;
    stopPlayback?: boolean;
  }

  let { move, stopPlayback = false }: Props = $props();
</script>

<section
  aria-label="Move Details"
  class="text-sm flex flex-col gap-4"
>
  {#if move.description}
    <p class="m-0">{move.description}</p>
  {/if}
  {#if move.videoId}
    <LazyYouTube
      videoId={move.videoId}
      title={move.name}
      class="mt-2"
      {stopPlayback}
    />
  {/if}
</section>
