import { mousePos } from '../../../stories/canvas/MousePos';
import { state } from '../../../stories/canvas/State';
import type { Element } from '../../../types/canvas';

export class MovePolygonHandler {
  private mousePos = mousePos;
  private state = state;

  isPointInsidePolygonId(element: Element) {
    const { x, y } = this.mousePos.relativePos;
    let inside = false;

    for (let i = 0, j = element.points.length - 1; i < element.points.length; j = i++) {
      const xi = element.points[i][0];
      const yi = element.points[i][1];
      const xj = element.points[j][0];
      const yj = element.points[j][1];

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

  isPointInsidePolygon() {
    let inside = false;

    this.state.$elements.forEach((element) => {
      if (this.isPointInsidePolygonId(element)) {
        inside = true;
      }
    });
    return inside;
  }

  onLabelMouseDown() {
    if (this.state.$action === 'moving') {
      const id = this.state.$elements.find((element) => this.isPointInsidePolygonId(element));
    }
  }

  onLabelMouseMove() {
    const isInside = this.isPointInsidePolygon();
    this.state.setAction(isInside ? 'moving' : 'none');
  }
}
