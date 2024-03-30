<script lang="ts">
  import Canvas from './canvas/index.svelte';
</script>

<svelte:head>
  <title>폴리곤</title>
</svelte:head>

<div class="main">
  <Canvas />
</div>

<style>
  .main {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    overflow: hidden;
  }
</style>
