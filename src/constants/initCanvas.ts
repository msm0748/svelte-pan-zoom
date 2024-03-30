import type { Position, Size, Tool } from '../types/canvas';

export const INITIAL_SIZE: Size = { width: 0, height: 0 };
export const INITIAL_POSITION: Position = { x: 0, y: 0 };
export const INITIAL_SCALE = 1;
export const MIN_SCALE = 0.1;
export const MAX_SCALE = 5;
export const ZOOM_SENSITIVITY = 0.1;
export const INITIAL_SELECTED_TOOL: Tool = 'select';
