import { get, writable, type Writable } from 'svelte/store';
import { MAX_SCALE, MIN_SCALE, ZOOM_SENSITIVITY } from '../../constants/initCanvas';
import type { Element, ImageInfo, Tool, Zoom } from '../../types/canvas';

class State {
  public _elements: Writable<Element[]> = writable([]);
  public _imageInfo: Writable<ImageInfo | null> = writable(null);
  public _scale = writable(1);
  public _selectedTool: Writable<Tool> = writable('select');

  get imageInfo() {
    if (!this._imageInfo) return;
    return get(this._imageInfo);
  }

  setImageInfo(imageInfo: ImageInfo) {
    this._imageInfo.set(imageInfo);
  }

  get elements() {
    return get(this._elements);
  }

  setElements(elements: Element[]) {
    this._elements.set(elements);
  }

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

  get selectedTool() {
    return this._selectedTool;
  }

  setSelectedTool(tool: Tool) {
    this._selectedTool.set(tool);
  }
}

export const state = new State();
