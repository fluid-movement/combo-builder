<script lang="ts">
  import '../app.css';
  import {page} from '$app/state';
  import {setContext} from "svelte";

  let {children} = $props();

  let routes = [
    {name: 'Home', path: '/'},
    {name: 'The Move Archive', path: '/moves'},
    {name: 'Combo Builder', path: '/combo-builder'},
  ];
</script>

<div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
    <nav class="mb-6 p-4 border-b border-stone-400">
        <ul class="flex gap-4 px-4 justify-between md:justify-start">
            {#each routes as route}
                <li>
                    <a href={route.path}
                       class="text-stone-700 hover:underline"
                       class:font-bold={page.url.pathname === route.path}>
                        {route.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
    {@render children()}
</div>
