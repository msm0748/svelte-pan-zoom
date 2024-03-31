import type { Position } from '../../types/canvas';
import { state } from './State';

const INITIAL_POSITION = { x: 0, y: 0 };

class MousePosition {
  public _currentPos = INITIAL_POSITION;
  public _viewPos = INITIAL_POSITION;
  public _relativePos = INITIAL_POSITION;
  public state = state;

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

  setViewPos(pos: Position) {
    this._viewPos = pos;
  }

  get relativePos() {
    const relativePosX = (this._currentPos.x - this._viewPos.x) / this.state.scale;
    const relativePosY = (this._currentPos.y - this._viewPos.y) / this.state.scale;

    return { relativePosX, relativePosY };
  }
}

export const mousePos = new MousePosition();
