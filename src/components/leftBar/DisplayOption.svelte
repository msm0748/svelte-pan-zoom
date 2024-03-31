<script lang="ts">
  export let brightness: number;
  export let contrast: number;
</script>

<div>
  <div>
    <div>밝기 조절</div>
    <input type="range" min={0} max={500} bind:value={brightness} />
    {brightness}
  </div>
  <div>
    <div>대비 조절</div>
    <input type="range" min={0} max={500} bind:value={contrast} />
    {contrast}
  </div>
</div>
