import { get, writable } from 'svelte/store';

type Zoom = 'zoomIn' | 'zoomOut';

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const ZOOM_SENSITIVITY = 0.1;

class State {
  public _scale = writable(1);

  get scale() {
    return get(this._scale);
  }

  setScale(type: Zoom) {
    switch (type) {
      case 'zoomIn':
        this._scale.update((scale) => {
          if (scale < MAX_SCALE - ZOOM_SENSITIVITY) {
            return scale + ZOOM_SENSITIVITY;
          }
          return scale;
        });
        break;
      case 'zoomOut':
        this._scale.update((scale) => {
          if (scale > MIN_SCALE + ZOOM_SENSITIVITY) {
            return scale - ZOOM_SENSITIVITY;
          }
          return scale;
        });
        break;
      default:
        break;
    }
  }
}

export const state = new State();
