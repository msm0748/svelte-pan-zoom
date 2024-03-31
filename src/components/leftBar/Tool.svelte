<script lang="ts">
  import { state } from '../../stories/canvas/State';
  import type { Tool } from '../../types/canvas';

  type ToolItem = {
    icon: string;
    text: string;
    tool: Tool;
  };

  const { selectedTool } = state;

  const toolList: ToolItem[] = [
    { icon: '선택 아이콘', text: '선택하기', tool: 'select' },
    { icon: '이동 아이콘', text: '이동하기', tool: 'move' },
    { icon: '폴리곤 아이콘', text: '폴리곤 그리기', tool: 'polygon' },
    { icon: '스마트 폴리곤 아이콘', text: '스마트 폴리곤 그리기', tool: 'smartPolygon' },
    { icon: '실행취소 아이콘', text: '실행취소', tool: 'undo' },
    { icon: '다시실행 아이콘', text: '다시실행', tool: 'redo' },
  ];
</script>

<div class="container">
  {#each toolList as { tool, icon }}
    <button on:click={() => state.setSelectedTool(tool)} class:active={tool === $selectedTool}>{icon}</button>
  {/each}
</div>

<style>
  .container {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .active {
    background-color: skyblue;
  }
</style>
