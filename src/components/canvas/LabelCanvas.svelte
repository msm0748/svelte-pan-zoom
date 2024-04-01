<script lang="ts">
  import { onMount } from 'svelte';
  import { LabelCanvasHandler } from '../../util/canvas/labelCanvasHandler';
  import type { Size } from '../../types/canvas';
  import { state } from '../../stories/canvas/State';

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

  // $: if (labelCanvasHandler) {
  //   labelCanvasHandler.drawFrame();
  // }

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

  // scale이 변경될 때마다 draw 함수를 실행하는 로직
  onMount(() => {
    const unsubscribeScale = state.scale.subscribe(() => {
      labelCanvasHandler.draw();
    });

    return () => {
      unsubscribeScale();
    };
  });
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
