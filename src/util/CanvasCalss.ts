const INITIAL_POSITION = { x: 0, y: 0 };
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;

export class ImageCanvas {
  private ctx: CanvasRenderingContext2D;
  private scale = 1;
  private viewPos = INITIAL_POSITION;
  private startPos = INITIAL_POSITION;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setTransform() {
    this.ctx.setTransform(this.scale, 0, 0, this.scale, this.viewPos.x, this.viewPos.y);
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

  handleMouseDown(e: MouseEvent) {
    const { offsetX, offsetY } = e;
    e.preventDefault();
    this.startPos = {
      x: offsetX - this.viewPos.x,
      y: offsetY - this.viewPos.y,
    };
  }

  handleMouseMove(e: MouseEvent) {
    const { offsetX, offsetY } = e;
    e.preventDefault();
    this.viewPos = {
      x: offsetX - this.startPos.x,
      y: offsetY - this.startPos.y,
    };
  }

  handleWheel(e: WheelEvent) {
    const { offsetX, offsetY } = e;
    e.preventDefault();
    const xs = (offsetX - this.viewPos.x) / this.scale;
    const ys = (offsetY - this.viewPos.y) / this.scale;
    const delta = -e.deltaY;
    const newScale = delta > 0 ? this.scale * 1.2 : this.scale / 1.2;

    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
      this.scale = newScale;
      this.viewPos = {
        x: offsetX - xs * this.scale,
        y: offsetY - ys * this.scale,
      };
    }
  }
}
