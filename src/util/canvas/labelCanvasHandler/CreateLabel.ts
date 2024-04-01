import { get } from 'svelte/store';
import { mousePos } from '../../../stories/canvas/MousePos';
import { state } from '../../../stories/canvas/State';
import type { Element } from '../../../types/canvas';

export class CreateLabelHandler {
  private ctx: CanvasRenderingContext2D;

  private mousePos = mousePos;
  private state = state;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /**
   * 모서리 포인트 사각형을 그리기
   */
  drawPointRectangles(points: number[][]) {
    this.ctx.fillStyle = 'white';
    points.forEach((point) => {
      const [x, y] = point;

      this.ctx.lineWidth = 2 / this.state.$scale;
      this.ctx.strokeStyle = 'black';

      this.ctx.strokeRect(
        x - this.state.resizePoint / 2,
        y - this.state.resizePoint / 2,
        this.state.resizePoint,
        this.state.resizePoint
      );
      this.ctx.fillRect(
        x - this.state.resizePoint / 2,
        y - this.state.resizePoint / 2,
        this.state.resizePoint,
        this.state.resizePoint
      );
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

      this.ctx.lineWidth = this.state.lineWidth / this.state.$scale;
      this.ctx.strokeStyle = 'lime';
    });
    this.ctx.stroke();
  }

  /**
   *  마지막 요소의 점과 현재 마우스 위치 사이에 선 그리기
   */
  drawLineFromLastPoint() {
    const { x, y } = this.mousePos.relativePos;
    const lastElement = this.state.$elements[this.state.$elements.length - 1];
    const points = lastElement.points;
    if (points.length > 0 && this.state.$action === 'drawing') {
      this.ctx.beginPath();
      this.ctx.lineWidth = this.state.lineWidth / this.state.$scale;
      this.ctx.strokeStyle = 'lime';
      const point = points[points.length - 1];
      this.ctx.moveTo(point[0], point[1]);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

  draw() {
    if (this.state.$elements.length > 0) {
      this.drawLineFromLastPoint();

      this.state.$elements.forEach((element) => {
        const points = element.points;
        this.drawConnectingLines(points);
        this.drawPointRectangles(points);
      });
    }
  }

  /**
   * 폴리곤의 점을 추가하거나 폴리곤을 완성(닫기)하는 로직
   */
  addOrClosePolygonPoint() {
    const { x, y } = this.mousePos.relativePos;
    const point = [x, y];
    const lastIndex = this.state.$elements.length - 1;
    const currentElements = this.state.$elements[lastIndex];
    const POINT_THRESHOLD = this.state.resizePoint;

    const hasNoPoints = this.state.$elements[lastIndex].points.length === 0;

    const [firstPointX, firstPointY] = hasNoPoints ? point : this.state.$elements[lastIndex].points[0];

    const isCloseToPoint =
      this.state.$elements[lastIndex].points.length > 2 &&
      Math.abs(x - firstPointX) < POINT_THRESHOLD &&
      Math.abs(y - firstPointY) < POINT_THRESHOLD;

    if (isCloseToPoint) {
      const endPoint = [firstPointX, firstPointY];
      this.state.$elements[lastIndex].points = [...currentElements.points, endPoint];
      this.state.setAction('none');
    } else {
      this.state.$elements[lastIndex].points = [...currentElements.points, point];
    }
  }

  onLabelMouseDown() {
    this.state.setAction('drawing');
    const id = +new Date();
    const element: Element = { id, type: 'polygon', label: 'test', points: [] };

    this.state.setElements([...this.state.$elements, element]);
  }

  onLabelMouseUp() {
    const selectedTool = get(this.state.selectedTool);

    switch (selectedTool) {
      case 'polygon':
        if (this.state.$action !== 'drawing') return;

        this.addOrClosePolygonPoint();

        break;

      default:
        break;
    }
  }
}
