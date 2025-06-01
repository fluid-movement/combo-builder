<script lang="ts">
  import type {Move} from "$lib/schemas/move";

  let {move}: { move: Move } = $props();

  // Process the video URL safely, handling undefined case properly
  let videoUrl = $derived(move.video
    ? move.video.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
    : null);
</script>

<section class="text-sm flex flex-col">
    <p>
        <strong>Level:</strong> {move.level}
    </p>
    <p>
        <strong>Type:</strong> {move.type}
    </p>
    <p>
        <strong>Description:</strong> {move.description || 'No description available.'}
    </p>
    {#if videoUrl}
        <div class="mt-2 aspect-video">
            <iframe
                    class="w-full h-full"
                    src={videoUrl}
                    title="{move.name} video"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
        </div>
    {/if}
</section>