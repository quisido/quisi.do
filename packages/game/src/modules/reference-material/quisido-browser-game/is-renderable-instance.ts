import { type BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type DrawImageInstance from './draw-image-instance.js';
import type LayerInstance from './layer-instance.js';

// Renderable instances are the only members of the `Instance` union that draw
// to a canvas, so they are identified by the capabilities they share instead of
// by `instanceof`. Importing the classes here would create a dependency cycle.
const isRenderableInstance = (
  instance: BrowserFamily | BrowserTextInstance,
): instance is DrawImageInstance | LayerInstance =>
  'canvasImageSource' in instance && 'onRender' in instance;

export default isRenderableInstance;
