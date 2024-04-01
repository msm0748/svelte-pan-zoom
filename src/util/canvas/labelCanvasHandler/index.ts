import { get } from 'svelte/store';
import { mousePos } from '../../../stories/canvas/MousePos';
import { state } from '../../../stories/canvas/State';
import { CreatePolygonHandler } from './CreatePolygon';
import { MovePolygonHandler } from './MovePolygon';

export class LabelCanvasHandler {
  private ctx: CanvasRenderingContext2D;

  public mousePos = mousePos;
  public state = state;
  public createPolygonHandler: CreatePolygonHandler;
  public movePolygonHandler: MovePolygonHandler;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.createPolygonHandler = new CreatePolygonHandler(ctx);
    this.movePolygonHandler = new MovePolygonHandler();
  }

  drawFrame() {
    this.draw();
    requestAnimationFrame(() => this.drawFrame());
  }

  setTransform() {
    this.ctx.setTransform(
      this.state.$scale,
      0,
      0,
      this.state.$scale,
      this.mousePos.$viewPos.x,
      this.mousePos.$viewPos.y
    );
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

    this.createPolygonHandler.draw();
  }

  onLabelMouseDown() {
    const selectedTool = get(this.state.selectedTool);

    switch (selectedTool) {
      case 'select':
        this.movePolygonHandler.onLabelMouseDown();
        break;
      case 'polygon':
        this.createPolygonHandler.onLabelMouseDown();
        break;

      default:
        break;
    }
  }

  onLabelMouseMove() {
    const selectedTool = get(this.state.selectedTool);
    // const { x: offsetX, y: offsetY } = this.mousePos.currentPos;

    switch (selectedTool) {
      case 'select':
        this.movePolygonHandler.onLabelMouseMove();
        break;

      default:
        break;
    }
  }

  onLabelMouseUp() {
    const selectedTool = get(this.state.selectedTool);

    switch (selectedTool) {
      case 'polygon':
        this.createPolygonHandler.onLabelMouseUp();
        break;

      default:
        break;
    }
  }

  onLabelMouseWheel() {
    this.state.setResizePoint();
  }
}
