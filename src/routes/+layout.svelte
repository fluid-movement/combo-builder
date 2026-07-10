<script lang="ts">
  import "../app.css";
  import { onNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";
  import { Dices, Landmark, MessageCircleQuestion } from "$icons";
  import { gameStarted } from "$lib/stores/gameStore";
  import { onMount } from "svelte";
  import { pwaInfo } from "virtual:pwa-info";

  let { children }: LayoutProps = $props();

  const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");

  onMount(async () => {
    const { registerSW } = await import("virtual:pwa-register");
    registerSW({ immediate: true });
  });

  const routeOrder: Record<string, number> = {
    "/": 0,
    "/moves": 1,
    "/how-to-play": 2,
  };

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    const from = navigation.from?.url.pathname ?? "";
    const to = navigation.to?.url.pathname ?? "";
    if (from === to) return;
    const fromIndex = routeOrder[from] ?? 0;
    const toIndex = routeOrder[to] ?? 0;
    document.documentElement.dataset.navDirection =
      toIndex >= fromIndex ? "forward" : "back";
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  const showNav = $derived(
    page.url.pathname !== "/" || !$gameStarted
  );
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

<div class="flex flex-col h-full">
<main style="view-transition-name: main-content;" class="p-4 flex-1 overflow-y-auto">
  {@render children()}
</main>

{#if showNav}
  <nav class="flex w-full p-2 gap-2 bg-background">
    <a
      data-sveltekit-preload-data="hover"
      href="/"
      class="flex-1 flex flex-col items-center gap-1 py-3 px-2 font-semibold text-xs rounded-xl {page.url.pathname === '/' ? 'bg-primary text-primary-background' : 'bg-button'}"
    >
      <Dices size="22" />
      <span>Combo Builder</span>
    </a>
    <a
      data-sveltekit-preload-data="hover"
      href="/moves"
      class="flex-1 flex flex-col items-center gap-1 py-3 px-2 font-semibold text-xs rounded-xl {page.url.pathname.startsWith('/moves') ? 'bg-primary text-primary-background' : 'bg-button'}"
    >
      <Landmark size="22" />
      <span>Moves</span>
    </a>
    <a
      data-sveltekit-preload-data="hover"
      href="/how-to-play"
      class="flex-1 flex flex-col items-center gap-1 py-3 px-2 font-semibold text-xs rounded-xl {page.url.pathname.startsWith('/how-to-play') ? 'bg-primary text-primary-background' : 'bg-button'}"
    >
      <MessageCircleQuestion size="22" />
      <span>How to play</span>
    </a>
  </nav>
{/if}
</div>
