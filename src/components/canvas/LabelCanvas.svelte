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
    console.log(labelCanvasHandler);
    // requestAnimationFrame(labelCanvasHandler.draw);
  }

  export const onLabelMouseDown = () => {
    labelCanvasHandler.onLabelMouseDown();
    labelCanvasHandler.draw();
  };

  export const onLabelMouseMove = () => {
    labelCanvasHandler.onLabelMouseMove();
    labelCanvasHandler.draw();
  };

  export const onLabelMouseUp = () => {
    labelCanvasHandler.onLabelMouseUp();
    labelCanvasHandler.draw();
  };

  export const onLabelMouseWheel = () => {
    labelCanvasHandler.onLabelMouseWheel();
    labelCanvasHandler.draw();
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
