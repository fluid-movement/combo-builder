<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import * as Sheet from "$lib/components/ui/sheet";
  import { Menu, Dices, Landmark, MessageCircleQuestion, Sun } from "$icons";
  import type { IconProps } from "@lucide/svelte";
  import { cn } from "$lib/utils";
  import type { LayoutProps } from "./$types";
  import { resolve } from "$app/paths";
  import type { Component } from "svelte";

  let { children }: LayoutProps = $props();

  type AppRoute = Parameters<typeof resolve>[0];
  type Icon = Component<IconProps>;

  const routes = [
    {
      name: "Combo Builder",
      path: "/",
      icon: Dices,
    },
    {
      name: "The Move Archive",
      path: "/(sub)/move-archive",
      icon: Landmark,
    },
    {
      name: "How to Play",
      path: "/(sub)/how-to-play",
      icon: MessageCircleQuestion,
    },
  ] satisfies { name: string; path: AppRoute; icon: Icon }[];

  let pageTitle = $derived(
    routes.find((route) => resolve(route.path) === page.url.pathname)?.name ||
      "Combo Builder",
  );

  let open = $state(false);
</script>

<header class="flex justify-between py-4 px-4">
  <h1>{pageTitle}</h1>
  <Sheet.Root bind:open>
    <Sheet.Trigger>
      <Menu aria-label="Navigation Sidebar" />
    </Sheet.Trigger>
    <Sheet.Content class="backdrop-blur-sm">
      <Sheet.Header>
        <div class="text-6xl font-bold">
          <span class="inline-flex gap-1 items-baseline"
            >C<Dices size="30" />mbo</span
          >Builder
        </div>
      </Sheet.Header>
      <nav class="p-4">
        <ul class="flex flex-col gap-4">
          {#each routes as route}
            {@const Icon = route.icon}
            <li
              class={cn(
                "p-2 rounded-md",
                page.url.pathname === route.path &&
                  "bg-primary text-primary-foreground",
              )}
            >
              <a
                onclick={() => (open = false)}
                href={resolve(route.path)}
                class="flex gap-2 items-center"><Icon />{route.name}</a
              >
            </li>
          {/each}
        </ul>
      </nav>
    </Sheet.Content>
  </Sheet.Root>
</header>

<main class="p-4">
  {@render children()}
</main>
