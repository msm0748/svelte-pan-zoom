<script lang="ts">
  import { onMount } from 'svelte';
  import { ImageCanvas } from './util/CanvasCalss';
  import { mousePos } from './util/Mouse';

  const img = new Image();

  let zoomCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let panning = false;
  let canvasHandler: ImageCanvas;

  onMount(() => {
    ctx = zoomCanvas.getContext('2d');
    if (ctx) {
      canvasHandler = new ImageCanvas(ctx);
    }

    img.src =
      'https://firebasestorage.googleapis.com/v0/b/storege-974dc.appspot.com/o/image%2Frabbit.jpeg?alt=media&token=cc501a63-0258-4aa3-809f-c45b743d2735';
    // img.onload = draw;
  });

  const handleMouseDown = (e: MouseEvent) => {
    panning = true;

    canvasHandler.handleMouseDown();
  };

  const handleMouseUp = () => {
    panning = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    mousePos.setCurrentPos(e);

    if (!panning) return;
    canvasHandler.handleMouseMove();
    canvasHandler.draw(img);
  };

  const handleWheel = (e: WheelEvent) => {
    const { deltaY } = e;
    canvasHandler.handleWheel(deltaY);
    canvasHandler.draw(img);
  };
</script>

<canvas
  bind:this={zoomCanvas}
  width="500"
  height="500"
  style="border: 1px solid"
  on:mousedown={handleMouseDown}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:wheel={handleWheel}
/>
