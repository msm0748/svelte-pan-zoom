<script lang="ts">
  import { onMount } from 'svelte';
  import { LabelCanvasHandler } from '../../util/canvas/LabelCanvasHandler';
  import type { Size } from '../../types/canvas';

  export let size: Size;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let labelCanvasHandler: LabelCanvasHandler;

  onMount(() => {
    ctx = canvas.getContext('2d');

    if (ctx) {
      labelCanvasHandler = new LabelCanvasHandler(ctx);
    }
  });

  $: if (labelCanvasHandler) {
    labelCanvasHandler.drawFrame();
  }

  export const onLabelMouseDown = () => {
    labelCanvasHandler.onLabelMouseDown();
  };

  export const onLabelMouseMove = () => {
    labelCanvasHandler.onLabelMouseMove();
  };

  export const onLabelMouseUp = () => {
    labelCanvasHandler.onLabelMouseUp();
  };

  export const onLabelMouseWheel = () => {
    labelCanvasHandler.onLabelMouseWheel();
  };
</script>

<canvas bind:this={canvas} width={size.width} height={size.height} />

<style>
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }
</style>
