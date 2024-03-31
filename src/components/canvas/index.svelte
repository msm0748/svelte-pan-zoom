<script lang="ts">
  import { onMount } from 'svelte';
  import { INITIAL_SIZE } from '../../constants/initCanvas';
  import { mousePos } from '../../stories/canvas/MousePos';
  import ImageCanvas from './ImageCanvas.svelte';
  import testImage from '../../assets/test02.jpg';
  import { adjustImageToCanvas } from '../../util/canvas/adjustImageToCanvas';
  import { state } from '../../stories/canvas/State';
  import LabelCanvas from './LabelCanvas.svelte';

  export let brightness: number;
  export let contrast: number;

  const { selectedTool } = state;

  let canvasSize = INITIAL_SIZE;
  let imageCanvasHandler: ImageCanvas;
  let labelCanvasHandler: LabelCanvas;

  let isTouch = false;
  let isGrabbing = false;
  let isImageLoading = true;
  let cursorStyle: string = 'default';

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

  const resetTouchAndGrabState = () => {
    isTouch = false;
    isGrabbing = false;
  };

  const handleMouseDown = (e: MouseEvent) => {
    isTouch = true;

    imageCanvasHandler.onZoomMouseDown();
    labelCanvasHandler.onLabelMouseDown();

    // 이미지 움직이기
    if ($selectedTool === 'move') isGrabbing = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    mousePos.setCurrentPos(e);

    if (isTouch && isGrabbing) imageCanvasHandler.onZoomMouseMove();
    labelCanvasHandler.onLabelMouseMove();
  };

  const handleMouseUp = (e: MouseEvent) => {
    labelCanvasHandler.onLabelMouseUp();
    resetTouchAndGrabState();
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const { ctrlKey, metaKey, deltaX, deltaY } = e;

    if (ctrlKey || metaKey) {
      imageCanvasHandler.onZoomByWheel(deltaY);
    } else {
      imageCanvasHandler.moveImageByWheel(deltaX, deltaY);
    }
    labelCanvasHandler.onLabelMouseWheel();
  };

  $: {
    switch ($selectedTool) {
      case 'move':
        cursorStyle = 'grab';
        if (isGrabbing) {
          cursorStyle = 'grabbing';
        }
        break;
      case 'polygon':
        cursorStyle = 'crosshair';
        break;
      default:
        cursorStyle = 'default';
        break;
    }
  }
</script>

<div
  class="container"
  style="cursor: {cursorStyle};"
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
  <ImageCanvas bind:this={imageCanvasHandler} size={canvasSize} {isImageLoading} {brightness} {contrast} />
  <LabelCanvas bind:this={labelCanvasHandler} size={canvasSize} />
</div>

<style>
  .container {
    position: relative;
    height: 100%;
    flex: 1;
    min-width: 300px;
  }
</style>
