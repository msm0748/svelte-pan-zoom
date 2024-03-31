<script lang="ts">
  import Tool from './Tool.svelte';
  import Zoom from './Zoom.svelte';
  import DisplayOption from './DisplayOption.svelte';

  export let brightness: number;
  export let contrast: number;
</script>

<aside>
  <div class="container">
    <DisplayOption bind:brightness bind:contrast />
    <Tool />
    <Zoom />
  </div>
</aside>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
