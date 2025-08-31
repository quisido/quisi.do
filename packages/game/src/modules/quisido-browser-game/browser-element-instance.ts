import type { Instance, Props, Type } from '../quisido-game/index.js';
import BrowserNodeInstance from './browser-node-instance.js';

interface HTMLElementMap {
  readonly image: HTMLImageElement;
  readonly music: HTMLAudioElement;
}

export default class BrowserElementInstance<T extends Type = Type>
  extends BrowserNodeInstance<HTMLElementMap[T]>
  implements Instance<BrowserNodeInstance, BrowserElementInstance, T>
{
  public update: (prevProps: Props[T], nextProps: Props[T]) => void;

  public constructor(
    node: HTMLElementMap[T],
    update: (prevProps: Props[T], nextProps: Props[T]) => void,
  ) {
    super(node);
    this.update = update;
  }

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
