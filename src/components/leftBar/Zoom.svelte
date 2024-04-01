<script lang="ts">
  import { mousePos } from '../../stories/canvas/MousePos';
  import { state } from '../../stories/canvas/State';

  const zoomIn = () => {
    state.setScale('zoomIn');
  };

  const zoomOut = () => {
    state.setScale('zoomOut');
  };

  const reset = () => {
    mousePos.resetViewPos();
    state.setScale('reset');
  };
</script>

<div>
  <button on:click={zoomIn}>확대</button>
  <button on:click={zoomOut}>축소</button>
  <button on:click={reset}>리셋</button>
</div>
