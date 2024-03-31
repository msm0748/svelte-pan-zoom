import { get } from 'svelte/store';
import { INITIAL_SELECTED_TOOL } from '../../constants/initCanvas';
import { state } from './State';

class KeyboardHandler {
  public state = state;
  private _beforeSelectedTool = INITIAL_SELECTED_TOOL;

  // 이전 선택된 도구를 저장하는 메서드
  savePreviousTool() {
    const selectedTool = get(this.state.selectedTool);

    if (selectedTool !== 'move') {
      this._beforeSelectedTool = selectedTool;
    }
    this.state.setSelectedTool('move');
  }

  // 저장된 이전 선택 도구를 가져오는 메서드
  getPreviousTool() {
    this.state.setSelectedTool(this._beforeSelectedTool);
    this._beforeSelectedTool = 'move';
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.code === 'Space') this.getPreviousTool();
  }

  handleKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'KeyV':
        this.state.setSelectedTool('select');
        break;
      case 'KeyM':
        this.state.setSelectedTool('move');
        break;
      case 'KeyP':
        this.state.setSelectedTool('polygon');
        break;
      case 'KeyS':
        this.state.setSelectedTool('smartPolygon');
        break;
      case 'Space':
        this.savePreviousTool();
        break;
      case 'Equal':
        this.state.setScale('zoomIn');
        break;
      case 'Minus':
        this.state.setScale('zoomOut');
        break;
      default:
        break;
    }
  }
}

export const keyboardHandler = new KeyboardHandler();
