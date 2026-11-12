// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import BrowserContainer from './browser-container.js';
import BrowserTextInstance from './browser-text-instance.js';
import LayerInstance from './layer-instance.js';

const { TestCanvas } = vi.hoisted(() => {
  class TestCanvas {
    public height = 100;
    public readonly images: CanvasImageSource[] = [];
    public width = 100;

    public readonly clearRect = vi.fn((): void => {
      this.images.length = 0;
    });

    public readonly drawImage = vi.fn((image: CanvasImageSource): void => {
      this.images.push(image);
    });

    public getContext(): object {
      return {
        canvas: this,
        clearRect: this.clearRect,
        drawImage: this.drawImage,
      };
    }
  }

  vi.stubGlobal('OffscreenCanvas', TestCanvas);
  return { TestCanvas };
});

const LAYER_PROPS = { height: 100, width: 100, x: 0, y: 0 };

const createScene = (kind: string) => {
  const onError = vi.fn();
  const canvas = new TestCanvas();
  const parent =
    kind === 'layer'
      ? new LayerInstance(LAYER_PROPS, onError)
      : new BrowserContainer(canvas as unknown as HTMLCanvasElement, onError);
  const output =
    parent instanceof LayerInstance
      ? (parent.canvasImageSource as unknown as InstanceType<typeof TestCanvas>)
      : canvas;
  const first = new LayerInstance(LAYER_PROPS);
  const second = new LayerInstance(LAYER_PROPS);
  const third = new LayerInstance(LAYER_PROPS);
  return { first, onError, output, parent, second, third };
};

describe.each(['container', 'layer'])(
  '%s sibling paint order',
  (kind): void => {
    beforeEach((): void => {
      vi.stubGlobal('OffscreenCanvas', TestCanvas);
    });

    afterEach((): void => {
      vi.restoreAllMocks();
      vi.unstubAllGlobals();
    });

    it('paints a new child before its sibling immediately', (): void => {
      const { first, output, parent, second, third } = createScene(kind);
      parent.appendChild(first);
      parent.appendChild(third);

      parent.insertBefore(second, third);

      expect(output.images).toEqual([
        first.canvasImageSource,
        second.canvasImageSource,
        third.canvasImageSource,
      ]);
    });

    it('moves existing children in both directions and to the end without resubscribing', (): void => {
      const { first, onError, output, parent, second, third } =
        createScene(kind);
      const onRender = vi.spyOn(first, 'onRender');
      parent.appendChild(first);
      parent.appendChild(second);
      parent.appendChild(third);

      parent.insertBefore(first, third);
      expect(output.images).toEqual([
        second.canvasImageSource,
        first.canvasImageSource,
        third.canvasImageSource,
      ]);

      parent.insertBefore(first, second);
      expect(output.images).toEqual([
        first.canvasImageSource,
        second.canvasImageSource,
        third.canvasImageSource,
      ]);

      parent.appendChild(first);
      expect(output.images).toEqual([
        second.canvasImageSource,
        third.canvasImageSource,
        first.canvasImageSource,
      ]);
      expect(onRender).toHaveBeenCalledTimes(1);
      expect(onError).not.toHaveBeenCalled();

      output.clearRect.mockClear();
      first.update(LAYER_PROPS, LAYER_PROPS);
      expect(output.clearRect).toHaveBeenCalledTimes(1);
      expect(output.images).toEqual([
        second.canvasImageSource,
        third.canvasImageSource,
        first.canvasImageSource,
      ]);
    });

    it('keeps a child in place when inserted before itself', (): void => {
      const { first, output, parent, second } = createScene(kind);
      parent.appendChild(first);
      parent.appendChild(second);

      parent.insertBefore(first, first);

      expect(output.images).toEqual([
        first.canvasImageSource,
        second.canvasImageSource,
      ]);
    });

    it('preserves non-rendering siblings as insertion anchors after they move', (): void => {
      const { first, output, parent, second, third } = createScene(kind);
      const text = new BrowserTextInstance('anchor');
      parent.appendChild(first);
      parent.appendChild(second);
      parent.appendChild(text);
      parent.insertBefore(text, second);

      parent.insertBefore(third, text);

      expect(output.images).toEqual([
        first.canvasImageSource,
        third.canvasImageSource,
        second.canvasImageSource,
      ]);
    });

    it('unsubscribes a moved child on removal and subscribes again on reattachment', (): void => {
      const { first, onError, output, parent, second } = createScene(kind);
      const onRender = vi.spyOn(first, 'onRender');
      parent.appendChild(first);
      parent.appendChild(second);
      parent.appendChild(first);

      parent.removeChild(first);
      expect(output.images).toEqual([second.canvasImageSource]);
      output.clearRect.mockClear();
      first.update(LAYER_PROPS, LAYER_PROPS);
      expect(output.clearRect).not.toHaveBeenCalled();

      parent.insertBefore(first, second);
      output.clearRect.mockClear();
      first.update(LAYER_PROPS, LAYER_PROPS);
      expect(output.clearRect).toHaveBeenCalledTimes(1);
      expect(output.images).toEqual([
        first.canvasImageSource,
        second.canvasImageSource,
      ]);
      expect(onRender).toHaveBeenCalledTimes(2);
      expect(onError).not.toHaveBeenCalled();
    });
  },
);

describe('nested layer painting', (): void => {
  beforeEach((): void => {
    vi.stubGlobal('OffscreenCanvas', TestCanvas);
  });

  afterEach((): void => {
    vi.unstubAllGlobals();
  });

  it('redraws the parent canvas when a layer reorders children', (): void => {
    const { first, output, parent, second, third } = createScene('container');
    first.appendChild(second);
    first.appendChild(third);
    parent.appendChild(first);
    output.clearRect.mockClear();

    first.appendChild(second);

    expect(output.clearRect).toHaveBeenCalledTimes(1);
  });
});
