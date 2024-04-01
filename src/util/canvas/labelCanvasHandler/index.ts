import { get } from 'svelte/store';
import { mousePos } from '../../../stories/canvas/MousePos';
import { state } from '../../../stories/canvas/State';
import { CreateLabelHandler } from './CreateLabel';
import { MoveLabelHandler } from './MoveLabel';

export class LabelCanvasHandler {
  private ctx: CanvasRenderingContext2D;

  public mousePos = mousePos;
  public state = state;
  public createLabelHandler: CreateLabelHandler;
  public moveLabelHandler: MoveLabelHandler;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.createLabelHandler = new CreateLabelHandler(ctx);
    this.moveLabelHandler = new MoveLabelHandler();
  }

  drawFrame() {
    this.draw();
    requestAnimationFrame(() => this.drawFrame());
  }

  setTransform() {
    this.ctx.setTransform(this.state.$scale, 0, 0, this.state.$scale, this.mousePos.viewPos.x, this.mousePos.viewPos.y);
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

    this.createLabelHandler.draw();
  }

  onLabelMouseDown() {
    const selectedTool = get(this.state.selectedTool);

    if (selectedTool !== 'polygon' || this.state.$action === 'drawing') return;
    this.createLabelHandler.onLabelMouseDown();
  }

  onLabelMouseMove() {
    const selectedTool = get(this.state.selectedTool);
    // const { x: offsetX, y: offsetY } = this.mousePos.currentPos;

    switch (selectedTool) {
      case 'select':
        this.moveLabelHandler.onLabelMouseMove();
        break;

      default:
        break;
    }
  }

  onLabelMouseUp() {
    const selectedTool = get(this.state.selectedTool);

    switch (selectedTool) {
      case 'polygon':
        if (this.state.$action !== 'drawing') return;
        this.createLabelHandler.onLabelMouseUp();

        break;

      default:
        break;
    }
  }

  onLabelMouseWheel() {
    this.state.setResizePoint();
  }
}
