<script>
  import {buttonVariants} from "$lib/components/ui/button";
  import {RotateCcw} from "@lucide/svelte";

</script>
<svelte:head>
    <title>How to Play</title>
    <meta name="description" content="A guide on how to play the Freestyle Frisbee combo building game."/>
</svelte:head>

{#snippet fakeButton(contents) }
    <span class="border rounded-md px-2 inline-block">{contents}</span>
{/snippet}

<main>
    <section>
        <p>
            Welcome to the Freestyle Frisbee combo building game! This game is designed to help you learn and practice
            moves and connect them into combos, or to inspire you to create new combos from moves you can already do.
        </p>
        <p>
            Whether you're a beginner or an experienced player, this game will get your creative juices flowing and help
            you improve your game.
        </p>
        <h2>Getting Started</h2>
        <p>
            To start playing, select your move difficulty level. Each level has a pool of moves that will be used to
            randomly create the combo.
            The Moves can be seen in the <a href="/move-archive">Move Archive</a> section.
        </p>
        <p>
            Start by selecting a catch with the {@render fakeButton("+ Catch")} button. Then do the catch!
        </p>
        <p>
            Now you can add moves or modifiers to your combo by clicking the {@render fakeButton("+ Move")} or {@render fakeButton("+ Modifier")} buttons.
            Whenever you add a move or modifier, think of a way to connect everything, and then do the combo!<br/>
            Strive to be as consecutive as possible!
        </p>
        <p class="flex items-center gap-2">
            To restart, press the <span class="border rounded-md p-2 inline-block"><RotateCcw size="18"/></span> button.
        </p>
        <h2>Moves and Modifiers</h2>
        <p>
            Moves will make up the bulk of your combo. Although you can add as many modifiers as you like, i would
            recommend adding one at most.
            Typically, you will pick a catch, then add a move, and then either add more moves or a modifier.
        </p>
        <p>
            Moves will typically be pulls, but you can also do a move as a throw or a pull off a throw. Get creative!
        </p>
        <p>
            Modifiers change single moves, or the whole combo. So for example a modifier might be "Spinning". You can
            either add a spin before a move, or before a catch.<br>
            Modifiers can also change the whole combo, so for example "Spin Change" would mean doing the combo on the opposite spin, than what you would naturally choose.
        </p>
        <a href="/" class={["mb-4 w-full",buttonVariants({variant:"default"})]}>Back to Combo Builder</a>
    </section>
</main>