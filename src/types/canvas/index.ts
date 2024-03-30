export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface ImageInfo {
  src: string;
  element: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}

export type Zoom = 'zoomIn' | 'zoomOut' | 'reset';
export type Action = 'none' | 'moving' | 'drawing' | 'resizing';

export type Tool = 'select' | 'move' | 'polygon' | 'smartPolygon' | 'comment' | 'undo' | 'redo';

export interface Element {
  id: number;
  type: 'polygon';
  label: string;
  points: number[][];
}

export interface SubmitElement extends Element {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SmartPolygon {
  id: number;
  type: 'polygon';
  points: Point;
}
