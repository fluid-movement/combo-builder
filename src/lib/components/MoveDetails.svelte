<script lang="ts">
  import type {Move} from "$lib/schemas/move";
  import LazyYouTube from "$lib/components/LazyYouTube.svelte";
  import {ucFirst} from "$lib/utils";

  interface Props {
    move: Move;
    stopPlayback?: boolean;
  }

  let {move, stopPlayback = false}: Props = $props();
</script>

<section aria-label="Move Details" class="text-sm flex flex-col">
    <p>
        <strong>Level:</strong> {ucFirst(move.level)}
    </p>
    <p>
        <strong>Type:</strong> {move.type.map((item) => ucFirst(item)).join(', ')}
    </p>
    {#if move.description}
        <p>
            <strong>Description:</strong> {move.description}
        </p>
    {/if}
    {#if move.videoId}
        <LazyYouTube
                videoId={move.videoId}
                title={move.name}
                class="mt-2"
                stopPlayback={stopPlayback}
        />
    {/if}
</section>