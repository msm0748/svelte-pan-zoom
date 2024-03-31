<script lang="ts">
  import { keyboardHandler } from '../stories/canvas/KeyboardHandler';
  import Canvas from './canvas/index.svelte';
  import LeftBar from './leftBar/index.svelte';

  let brightness = 100;
  let contrast = 100;

  const handleKeyUp = (e: KeyboardEvent) => {
    keyboardHandler.handleKeyUp(e);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    keyboardHandler.handleKeyDown(e);
  };
</script>

<svelte:head>
  <title>폴리곤</title>
</svelte:head>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<div class="main">
  <LeftBar bind:brightness bind:contrast />
  <Canvas {brightness} {contrast} />
</div>

<style>
  .main {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    overflow: hidden;
  }
</style>
