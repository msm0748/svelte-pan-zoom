import { get, writable, type Writable } from 'svelte/store';
import type { Position } from '../../types/canvas';
import { state } from './State';

const INITIAL_POSITION = { x: 0, y: 0 };

class MousePosition {
  private _currentPos = INITIAL_POSITION;
  private _viewPos: Writable<Position> = writable(INITIAL_POSITION);
  private _relativePos = INITIAL_POSITION;
  private state = state;

  get currentPos() {
    return this._currentPos;
  }

  setCurrentPos(e: MouseEvent) {
    const { offsetX, offsetY } = e;
    this._currentPos = { x: offsetX, y: offsetY };
  }

  get viewPos() {
    return this._viewPos;
  }
  get $viewPos() {
    return get(this._viewPos);
  }

  setViewPos(pos: Position) {
    this._viewPos.set(pos);
  }

  resetViewPos() {
    this._viewPos.set(INITIAL_POSITION);
  }

  get relativePos() {
    const relativePosX = (this._currentPos.x - this.$viewPos.x) / this.state.$scale;
    const relativePosY = (this._currentPos.y - this.$viewPos.y) / this.state.$scale;

    this._relativePos = { x: relativePosX, y: relativePosY };

    return this._relativePos;
  }
}

export const mousePos = new MousePosition();
