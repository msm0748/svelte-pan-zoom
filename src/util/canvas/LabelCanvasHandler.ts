import { get } from 'svelte/store';
import { mousePos } from '../../stories/canvas/MousePos';
import { state } from '../../stories/canvas/State';
import type { Action, Element } from '../../types/canvas';

export class LabelCanvasHandler {
  private ctx: CanvasRenderingContext2D;

  private mousePos = mousePos;
  private state = state;
  private readonly lineWidth = 2;
  private _action: Action = 'none';
  private _resizePoint: number = 7 / this.state.scale + 3 / this.state.scale;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  drawFrame() {
    this.draw();
    requestAnimationFrame(() => this.drawFrame());
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

  /**
   * 모서리 포인트 사각형을 그리기
   */
  drawPointRectangles(points: number[][]) {
    this.ctx.fillStyle = 'white';
    points.forEach((point) => {
      const [x, y] = point;

      this.ctx.lineWidth = 2 / this.state.scale;
      this.ctx.strokeStyle = 'black';

      this.ctx.strokeRect(x - this._resizePoint / 2, y - this._resizePoint / 2, this._resizePoint, this._resizePoint);
      this.ctx.fillRect(x - this._resizePoint / 2, y - this._resizePoint / 2, this._resizePoint, this._resizePoint);
    });
  }

  /**
   * 주어진 점들을 이어 선 그리기
   */
  drawConnectingLines(points: number[][]) {
    this.ctx.beginPath();

    points.forEach((point, index) => {
      const [x, y] = point;

      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }

      this.ctx.lineWidth = this.lineWidth / this.state.scale;
      this.ctx.strokeStyle = 'lime';
    });
    this.ctx.stroke();
  }

  draw() {
    this.clearRect();
    this.setTransform();

    if (this.state.elements.length > 0) {
      // this.drawLineFromLastPoint(currentMousePos);

      this.state.elements.forEach((element) => {
        const points = element.points;
        this.drawConnectingLines(points);
        this.drawPointRectangles(points);
      });
    }
  }

  onLabelMouseDown() {
    const selectedTool = get(this.state.selectedTool);

    if (selectedTool !== 'polygon' || this._action === 'drawing') return;
    this._action = 'drawing';
    const id = +new Date();
    const element: Element = { id, type: 'polygon', label: 'test', points: [] };

    this.state.setElements([...this.state.elements, element]);
  }

  onLabelMouseMove() {
    // const { x: offsetX, y: offsetY } = this.mousePos.currentPos;
  }

  onLabelMouseUp() {
    const selectedTool = get(this.state.selectedTool);

    switch (selectedTool) {
      case 'polygon':
        if (this._action !== 'drawing') return;

        // handlePolygon(relativePosX, relativePosY);
        this.addOrClosePolygonPoint();

        break;

      default:
        break;
    }
  }

  onLabelMouseWheel() {
    this._resizePoint = 7 / this.state.scale + 3 / this.state.scale;
  }

  /**
   * 폴리곤의 점을 추가하거나 폴리곤을 완성(닫기)하는 로직
   */
  addOrClosePolygonPoint() {
    const { relativePosX, relativePosY } = this.mousePos.relativePos;
    const point = [relativePosX, relativePosY];
    const lastIndex = this.state.elements.length - 1;
    const currentElements = this.state.elements[lastIndex];
    const POINT_THRESHOLD = this._resizePoint;

    const hasNoPoints = this.state.elements[lastIndex].points.length === 0;

    const [firstPointX, firstPointY] = hasNoPoints ? point : this.state.elements[lastIndex].points[0];

    const isCloseToPoint =
      this.state.elements[lastIndex].points.length > 2 &&
      Math.abs(relativePosX - firstPointX) < POINT_THRESHOLD &&
      Math.abs(relativePosY - firstPointY) < POINT_THRESHOLD;

    if (isCloseToPoint) {
      const endPoint = [firstPointX, firstPointY];
      // 변수 변경이 되는지 확인해보기
      this.state.elements[lastIndex].points = [...currentElements.points, endPoint];
      this._action = 'none';
    } else {
      this.state.elements[lastIndex].points = [...currentElements.points, point];
    }
  }
}
