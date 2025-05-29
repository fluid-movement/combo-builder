<script lang="ts">
  import '../app.css';
  import {page} from '$app/state';
  import {Separator} from "$lib/components/ui/separator";

  let {children} = $props();

  let routes = [
    {name: 'Combo Builder', path: '/'},
    {name: 'The Move Archive', path: '/moves'},
  ];
</script>

<div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
    <nav class="p-4">
        <ul class="flex gap-4 md:gap-8">
            {#each routes as route}
                <li>
                    <a href={route.path}
                       class="tracking-tight hover:underline"
                       class:underline={page.url.pathname === route.path}
                    >
                        {route.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
    <Separator class="mb-4"/>
    {@render children()}
</div>
