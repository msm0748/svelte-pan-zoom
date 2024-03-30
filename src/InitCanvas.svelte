<script lang="ts">
  import { onMount } from 'svelte';

  const img = new Image();
  const INITIAL_POSITION = { x: 0, y: 0 };
  const MIN_SCALE = 0.1;
  const MAX_SCALE = 10;

  let zoomCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let scale = 1;
  let panning = false;
  let viewPos = INITIAL_POSITION;
  let startPos = INITIAL_POSITION;

  const setTransform = () => {
    if (!ctx) return;
    ctx.setTransform(scale, 0, 0, scale, viewPos.x, viewPos.y);
  };

  const clearRect = () => {
    if (!ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  };

  const draw = () => {
    if (!ctx) return;
    clearRect();
    setTransform();
    ctx.drawImage(img, 0, 0, zoomCanvas.width, zoomCanvas.height);
  };

  onMount(() => {
    ctx = zoomCanvas.getContext('2d');

    img.src =
      'https://firebasestorage.googleapis.com/v0/b/storege-974dc.appspot.com/o/image%2Frabbit.jpeg?alt=media&token=cc501a63-0258-4aa3-809f-c45b743d2735';
    img.onload = draw;
  });

  const handleMouseDown = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;
    e.preventDefault();
    startPos = {
      x: offsetX - viewPos.x,
      y: offsetY - viewPos.y,
    };
    panning = true;
  };

  const handleMouseUp = () => {
    panning = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;
    e.preventDefault();
    if (!panning) return;
    viewPos = {
      x: offsetX - startPos.x,
      y: offsetY - startPos.y,
    };
    draw();
  };

  const handleWheel = (e: WheelEvent) => {
    const { offsetX, offsetY } = e;
    e.preventDefault();
    const xs = (offsetX - viewPos.x) / scale;
    const ys = (offsetY - viewPos.y) / scale;
    const delta = -e.deltaY;
    const newScale = delta > 0 ? scale * 1.2 : scale / 1.2;

    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
      scale = newScale;
      viewPos = {
        x: offsetX - xs * scale,
        y: offsetY - ys * scale,
      };
    }
    draw();
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
