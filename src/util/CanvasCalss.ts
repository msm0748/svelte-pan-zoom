import { mousePos } from './Mouse';
import { state } from './State';

const INITIAL_POSITION = { x: 0, y: 0 };
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;

export class ImageCanvas {
  private ctx: CanvasRenderingContext2D;

  private startPos = INITIAL_POSITION;
  private _mousePos = mousePos;
  private _state = state;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setTransform() {
    console.log(this._state.scale);
    this.ctx.setTransform(
      this._state.scale,
      0,
      0,
      this._state.scale,
      this._mousePos.viewPos.x,
      this._mousePos.viewPos.y
    );
  }

  clearRect() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
  }

  draw(img: HTMLImageElement) {
    this.clearRect();
    this.setTransform();
    this.ctx.drawImage(img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  handleMouseDown() {
    const { x: offsetX, y: offsetY } = this._mousePos.currentPos;

    this.startPos = {
      x: offsetX - this._mousePos.viewPos.x,
      y: offsetY - this._mousePos.viewPos.y,
    };
  }

  handleMouseMove() {
    const { x: offsetX, y: offsetY } = this._mousePos.currentPos;

    this._mousePos.setViewPos({
      x: offsetX - this.startPos.x,
      y: offsetY - this.startPos.y,
    });
  }

  handleWheel(deltaY: number) {
    const { x: offsetX, y: offsetY } = this._mousePos.currentPos;

    const xs = (offsetX - this._mousePos.viewPos.x) / this._state.scale;
    const ys = (offsetY - this._mousePos.viewPos.y) / this._state.scale;
    const newScale = -deltaY > 0 ? this._state.scale * 1.2 : this._state.scale / 1.2;

    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
      this._state.setScale(newScale);
      this._mousePos.setViewPos({
        x: offsetX - xs * this._state.scale,
        y: offsetY - ys * this._state.scale,
      });
    }
  }
}
