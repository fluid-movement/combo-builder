<script lang="ts">
  import '../app.css';
  import {page} from '$app/state';
  import {Separator} from "$lib/components/ui/separator";
  import * as Sheet from "$lib/components/ui/sheet";
  import {buttonVariants} from "$lib/components/ui/button";
  import {ChevronRight, Menu} from '@lucide/svelte';

  let {children} = $props();

  let routes = [
    {name: 'Combo Builder', path: '/'},
    {name: 'The Move Archive', path: '/move-archive'},
  ];

  let pageTitle = $derived(routes.find(route => route.path === page.url.pathname)?.name || 'Combo Builder');

  let open = $state(false);
</script>

<div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
    <div class="flex justify-between py-4">
        <h1 class="text-3xl font-bold tracking-tight">{pageTitle}</h1>
        <Sheet.Root bind:open>
            <Sheet.Trigger class={buttonVariants({ variant: "outline" })}>
                <Menu/>
            </Sheet.Trigger>
            <Sheet.Content side="left" class="backdrop-blur-sm">
                <Sheet.Header>
                    <img src="/logo.png" alt="Logo" class="mt-8 mx-auto mb-4"/>
                </Sheet.Header>
                <nav class="p-4">
                    <ul class="flex flex-col gap-4">
                        {#each routes as route}
                            <li class={['p-2 rounded-md', page.url.pathname === route.path ? 'bg-accent' : 'border-hidden']}>
                                <a onclick={() => open = false} href={route.path} class="flex gap-2"><ChevronRight /><span>{route.name}</span></a>
                            </li>
                        {/each}
                    </ul>
                </nav>
            </Sheet.Content>
        </Sheet.Root>
    </div>
    <Separator class="mb-4 bg-primary"/>
    {@render children()}
</div>
