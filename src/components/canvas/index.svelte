<script lang="ts">
  import { onMount } from 'svelte';
  import { INITIAL_SIZE } from '../../constants/initCanvas';
  import { mousePos } from '../../stories/canvas/MousePos';
  import ImageCanvas from './ImageCanvas.svelte';
  import testImage from '../../assets/test02.jpg';
  import { adjustImageToCanvas } from '../../util/canvas/adjustImageToCanvas';
  import { state } from '../../stories/canvas/State';

  let canvasSize = INITIAL_SIZE;
  let imageCanvasHandler: ImageCanvas;
  let panning = false;
  let isImageLoading = true;

  onMount(() => {
    //이미지 정보 및 사이즈 배치

    const img = new Image();
    // img.src = imageSrc;
    img.src = testImage;
    img.onload = () => {
      // 이미지와 캔버스 크기에 따라 이미지를 조정

      const adjustedImageProperties = adjustImageToCanvas(img, canvasSize);
      const originalWidth = img.width;
      const originalHeight = img.height;

      const imageInfo = {
        src: img.src,
        element: img,
        ...adjustedImageProperties,
        originalWidth,
        originalHeight,
      };

      state.setImageInfo(imageInfo);

      isImageLoading = false;
    };
  });

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    const { offsetX, offsetY } = e;
    panning = true;

    imageCanvasHandler.onZoomMouseDown();
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    mousePos.setCurrentPos(e);
    if (!panning) return;

    imageCanvasHandler.onZoomMouseMove();
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    const { offsetX, offsetY } = e;

    panning = false;
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const { ctrlKey, metaKey, deltaX, deltaY } = e;

    imageCanvasHandler.onZoomByWheel(deltaY);
  };
</script>

<div
  class="container"
  bind:offsetWidth={canvasSize.width}
  bind:offsetHeight={canvasSize.height}
  on:mousedown={handleMouseDown}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:wheel={handleWheel}
  tabindex="0"
  role="button"
  aria-pressed="false"
>
  <ImageCanvas bind:this={imageCanvasHandler} size={canvasSize} {isImageLoading} />
</div>

<style>
  .container {
    position: relative;
    height: 100%;
    flex: 1;
    min-width: 300px;
  }
</style>
