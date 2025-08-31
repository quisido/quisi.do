import type { Container } from '../quisido-game/index.js';
import type BrowserElementInstance from './browser-element-instance.js';
import BrowserNodeInstance from './browser-node-instance.js';

export default class BrowserContainer
  extends BrowserNodeInstance<HTMLCanvasElement>
  implements Container<BrowserNodeInstance, BrowserElementInstance>
{
  public appendChild(
    instance: BrowserElementInstance | BrowserNodeInstance,
  ): void {
    this.node.appendChild(instance.node);
  }

  public insertBefore(
    child: BrowserElementInstance | BrowserNodeInstance,
    beforeChild: BrowserElementInstance | BrowserNodeInstance, // | SuspenseInstance,
  ): void {
    this.node.insertBefore(child.node, beforeChild.node);
  }

  public removeChild(
    instance: BrowserElementInstance | BrowserNodeInstance,
  ): void {
    this.node.removeChild(instance.node);
  }
}
