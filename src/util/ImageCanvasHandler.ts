import { INITIAL_POSITION } from '../constants/initCanvas';
import { mousePos } from './Mouse';
import { state } from './State';

export class ImageCanvasHandler {
  private ctx: CanvasRenderingContext2D;

  private startPos = INITIAL_POSITION;
  private mousePos = mousePos;
  private state = state;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setTransform() {
    this.ctx.setTransform(this.state.scale, 0, 0, this.state.scale, this.mousePos.viewPos.x, this.mousePos.viewPos.y);
  }

  clearRect() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
  }

  draw() {
    this.clearRect();
    this.setTransform();

    if (this.state.imageInfo) {
      this.ctx.drawImage(
        this.state.imageInfo.element,
        this.state.imageInfo.x,
        this.state.imageInfo.y,
        this.state.imageInfo.width,
        this.state.imageInfo.height
      );
    }
  }

  handleMouseDown() {
    const { x: offsetX, y: offsetY } = this.mousePos.currentPos;

    this.startPos = {
      x: offsetX - this.mousePos.viewPos.x,
      y: offsetY - this.mousePos.viewPos.y,
    };
  }

  handleMouseMove() {
    const { x: offsetX, y: offsetY } = this.mousePos.currentPos;

    this.mousePos.setViewPos({
      x: offsetX - this.startPos.x,
      y: offsetY - this.startPos.y,
    });
  }

  handleWheel(deltaY: number) {
    const { x: offsetX, y: offsetY } = this.mousePos.currentPos;

    const xs = (offsetX - this.mousePos.viewPos.x) / this.state.scale;
    const ys = (offsetY - this.mousePos.viewPos.y) / this.state.scale;

    -deltaY > 0 ? this.state.setScale('zoomIn') : this.state.setScale('zoomOut');

    this.mousePos.setViewPos({
      x: offsetX - xs * this.state.scale,
      y: offsetY - ys * this.state.scale,
    });
  }
}
