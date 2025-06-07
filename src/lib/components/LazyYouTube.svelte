<script lang="ts">
  interface Props {
    videoId: string;
    title: string;
    class?: string;
  }

  let {videoId, title, class: className = ''}: Props = $props();

  let isActivated = $state(false);

  const activateVideo = () => {
    isActivated = true;
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateVideo();
    }
  };
</script>

{#snippet playButton()}
    <span class="absolute inset-0 group-hover:bg-opacity-30 transition-colors flex items-center justify-center">
        <span class="bg-red-600 rounded-full p-4 group-hover:bg-red-700 transition-colors">
          <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
          </svg>
        </span>
    </span>
{/snippet}
<div class="aspect-video bg-gray-100 rounded-lg overflow-hidden relative {className}">
    {#if !isActivated}
        <!-- Thumbnail with play button -->
        <div
                class="w-full h-full relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                onclick={activateVideo}
                onkeydown={handleKeyPress}
                tabindex="0"
                role="button"
                aria-label="Play video: {title}"
        >
            <img
                    src="https://img.youtube.com/vi/{videoId}/maxresdefault.jpg"
                    alt="Video thumbnail for {title}"
                    class="w-full h-full object-cover"
                    loading="lazy"
            />
            {@render playButton()}
        </div>
    {:else}
        <!-- YouTube iframe -->
        <iframe
                class="w-full h-full border-0"
                src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="Video: {title}"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
        </iframe>
    {/if}
</div>