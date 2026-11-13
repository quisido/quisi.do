import { assert } from 'vitest';

const mockConvertToBlob = (): Promise<Blob> => Promise.resolve(new Blob());
const mockTransferToImageBitmap = (): ImageBitmap => new ImageBitmap();

export default class MockOffscreenCanvas
  extends EventTarget
  implements OffscreenCanvas
{
  #canvas: HTMLCanvasElement;
  public convertToBlob: () => Promise<Blob> = mockConvertToBlob;
  public transferToImageBitmap: () => ImageBitmap = mockTransferToImageBitmap;

  public constructor(width: number, height: number) {
    super();
    const canvas: HTMLCanvasElement = window.document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    this.#canvas = canvas;
  }

  public getContext(contextId: '2d'): OffscreenCanvasRenderingContext2D;
  public getContext(
    contextId: Exclude<OffscreenRenderingContextId, '2d'>,
  ): null;
  public getContext(
    contextId: OffscreenRenderingContextId,
  ): OffscreenCanvasRenderingContext2D | null {
    if (contextId !== '2d') {
      return null;
    }

    const context: CanvasRenderingContext2D | null =
      this.#canvas.getContext('2d');
    assert(context !== null);
    return Object.assign(context, { canvas: this });
  }

  public get height(): number {
    return this.#canvas.height;
  }

  public set height(value: number) {
    this.#canvas.height = value;
  }

  public oncontextlost(ev: Event): void {
    this.#canvas.oncontextlost?.(ev);
  }

  public oncontextrestored(ev: Event): void {
    this.#canvas.oncontextrestored?.(ev);
  }

  public get width(): number {
    return this.#canvas.width;
  }

  public set width(value: number) {
    this.#canvas.width = value;
  }
}
