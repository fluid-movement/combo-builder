<script lang="ts">
  import { Plus, RotateCcw } from "$icons";
  import Logo from "$lib/components/Logo.svelte";
  import type { Component } from "svelte";
</script>

<svelte:head>
  <title>How to Play</title>
  <meta
    name="description"
    content="A guide on how to play the Freestyle Frisbee combo building game."
  />
</svelte:head>

{#snippet fakeButton(Icon: Component, contents: string)}
  <span class="border rounded-md px-2 inline-flex items-center gap-1"><Icon size="12" />{contents}</span>
{/snippet}

<Logo size="sm" />
<h1 class="text-3xl font-bold mb-4 mt-4 text-center">How to play</h1>
<section>
  <p>
    Welcome to the Freestyle Frisbee combo building game! This game is designed
    to help you learn and practice moves and connect them into combos, or to
    inspire you to create new combos from moves you can already do.
  </p>
  <p>
    Whether you're a beginner or an experienced player, this game will get your
    creative juices flowing and help you improve your game.
  </p>
  <h2>Select your difficulty</h2>
  <p>
    To start playing, select your move difficulty level. Each level has a list
    of moves that will be used to randomly create the combo. Your pool of moves
    will be your selected difficulty, and all below, so for example selecting
    "Advanced", will give you all advanced and beginner moves. The moves can be
    seen in the <a href="/moves">Moves</a> section.
  </p>
  <h2>Start the game</h2>
  <p>
    Press {@render fakeButton(Plus, "Tap to start your combo")} then do the catch!
  </p>
  <p>
    Now you can add moves or modifiers to your combo by clicking the {@render fakeButton(Plus,
      "Move",
    )} or {@render fakeButton(Plus, "Modifier")} buttons. Whenever you add a move or modifier,
    think of a way to connect everything, and then do the combo! Strive to be as consecutive as possible!
  </p>
  <p class="flex items-center gap-2">
    
    To restart, press {@render fakeButton(RotateCcw, "Reset")}
  </p>
  <h2>Moves and Modifiers</h2>
  <p>
    Moves will make up the bulk of your combo. Although you can add as many
    modifiers as you like, i would recommend adding one at most. Typically, you
    will pick a catch, then add a move, and then either add more moves or a
    modifier.
  </p>
  <p>
    Moves will typically be pulls, but you can also do a move as a throw or a
    pull off a throw. Get creative!
  </p>
  <p>
    Modifiers change single moves, or the whole combo. So for example a modifier
    might be "Spinning". You can either add a spin before a move, or before a
    catch.<br />
    Modifiers can also change the whole combo, so for example "Spin Change" would
    mean doing the combo on the opposite spin, than what you would naturally choose.
  </p>
</section>
