<script lang="ts">
  import { onMount } from 'svelte';
  import type { Size } from '../../types/canvas';
  import { ImageCanvasHandler } from '../../util/canvas/ImageCanvasHandler';

  export let size: Size, isImageLoading: boolean;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let imageCanvasHandler: ImageCanvasHandler;

  onMount(() => {
    ctx = canvas.getContext('2d');
    if (ctx) {
      imageCanvasHandler = new ImageCanvasHandler(ctx);
    }
  });

  export const onZoomMouseDown = () => {
    imageCanvasHandler.onZoomMouseDown();
  };

  export const onZoomMouseMove = () => {
    imageCanvasHandler.onZoomMouseMove();
    imageCanvasHandler.draw();
  };

  export const onZoomByWheel = (deltaY: number) => {
    imageCanvasHandler.onZoomByWheel(deltaY);
    imageCanvasHandler.draw();
  };

  export const moveImageByWheel = (deltaX: number, deltaY: number) => {
    imageCanvasHandler.moveImageByWheel(deltaX, deltaY);
    imageCanvasHandler.draw();
  };

  $: if (!isImageLoading) {
    imageCanvasHandler.draw();
  }
</script>

<canvas bind:this={canvas} width={size.width} height={size.height} />
