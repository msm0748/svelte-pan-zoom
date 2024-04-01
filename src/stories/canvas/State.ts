import { get, writable, type Writable } from 'svelte/store';
import { MAX_SCALE, MIN_SCALE, ZOOM_SENSITIVITY } from '../../constants/initCanvas';
import type { Action, Element, ImageInfo, Tool, Zoom } from '../../types/canvas';

class State {
  private _elements: Writable<Element[]> = writable([]);
  private _imageInfo: Writable<ImageInfo | null> = writable(null);
  private _scale = writable(1);
  private _selectedTool: Writable<Tool> = writable('select');
  private _action: Writable<Action> = writable('none');
  private _resizePoint: number = 7 / this.$scale + 3 / this.$scale;
  private readonly _lineWidth = 2;

  get lineWidth() {
    return this._lineWidth;
  }

  get resizePoint() {
    return this._resizePoint;
  }

  setResizePoint() {
    this._resizePoint = 7 / this.$scale + 3 / this.$scale;
  }

  get $action() {
    return get(this._action);
  }

  get action() {
    return this._action;
  }

  setAction(action: Action) {
    this._action.set(action);
  }

  get $imageInfo() {
    if (!this._imageInfo) return;
    return get(this._imageInfo);
  }

  setImageInfo(imageInfo: ImageInfo) {
    this._imageInfo.set(imageInfo);
  }

  get $elements() {
    return get(this._elements);
  }

  setElements(elements: Element[]) {
    this._elements.set(elements);
  }

  get $scale() {
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

  get selectedTool() {
    return this._selectedTool;
  }

  setSelectedTool(tool: Tool) {
    this._selectedTool.set(tool);
  }
}

export const state = new State();
