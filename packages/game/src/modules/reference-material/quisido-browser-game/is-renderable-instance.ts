import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import DrawImageInstance from './draw-image-instance.js';
import LayerInstance from './layer-instance.js';

export default function isRenderableInstance(
  instance: BrowserFamily | BrowserTextInstance,
): instance is DrawImageInstance | LayerInstance {
  return (
    instance instanceof DrawImageInstance || instance instanceof LayerInstance
  );
}
