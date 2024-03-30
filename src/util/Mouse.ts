type Position = {
  x: number;
  y: number;
};

const INITIAL_POSITION = { x: 0, y: 0 };

class MousePosition {
  public _currentPos = INITIAL_POSITION;
  public _viewPos = INITIAL_POSITION;

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
}

export const mousePos = new MousePosition();
