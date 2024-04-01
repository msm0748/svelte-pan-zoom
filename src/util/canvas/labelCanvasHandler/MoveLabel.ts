import { mousePos } from '../../../stories/canvas/MousePos';
import { state } from '../../../stories/canvas/State';

export class MoveLabelHandler {
  private mousePos = mousePos;
  private state = state;

  /**
   * Ray Casting Algorithm
   */
  isPointInsidePolygon() {
    const { relativePosX: x, relativePosY: y } = this.mousePos.relativePos;
    let inside = false;

    this.state.elements.forEach((element) => {
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
    });

    return inside;
  }
  onLabelMouseMove() {
    const isInside = this.isPointInsidePolygon();
    console.log(isInside);
    // if (isInside) {
    //   cursorStyle = 'move';
    // } else {
    //   cursorStyle = 'default';
    // }
  }
}
