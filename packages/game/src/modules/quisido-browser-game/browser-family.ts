import type AudioInstance from './audio-instance.js';
import type DrawImageInstance from './draw-image-instance.js';
import type LayerInstance from './layer-instance.js';
import type TextInstance from './text-instance.js';

export type BrowserFamily =
  | AudioInstance
  | DrawImageInstance
  | LayerInstance
  | TextInstance;
