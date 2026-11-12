// @vitest-environment node
import { createElement, Fragment, type ReactNode, Suspense, use } from 'react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest';
import AudioInstance from './audio-instance.js';
import BrowserReconciler from './browser-reconciler.js';

vi.hoisted((): void => {
  vi.stubGlobal('OffscreenCanvas', function createOffscreenCanvas(): {
    height: number;
    width: number;
  } {
    return { height: 1, width: 1 };
  });
});

const createCanvas = (): HTMLCanvasElement => {
  const canvas = { height: 100, width: 100 };
  return {
    ...canvas,
    getContext: (): object => ({
      canvas,
      clearRect: vi.fn(),
      drawImage: vi.fn(),
    }),
  } as unknown as HTMLCanvasElement;
};

const stubAudio = (): {
  pause: Mock<VoidFunction>;
  play: Mock<() => Promise<void>>;
} => {
  const pause = vi.fn<VoidFunction>();
  const play = vi.fn<() => Promise<void>>().mockResolvedValue();
  vi.stubGlobal(
    'Audio',
    class {
      public currentTime = 0;
      public loop = false;
      public pause = pause;
      public play = play;
      public volume = 1;
    },
  );
  return { pause, play };
};

describe('BrowserReconciler audio', (): void => {
  beforeEach((): void => {
    vi.stubGlobal('window', { clearTimeout, queueMicrotask, setTimeout });
    vi.stubGlobal(
      'OffscreenCanvas',
      function createOffscreenCanvas(): HTMLCanvasElement {
        return createCanvas();
      },
    );
  });

  afterEach((): void => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe.each(['container', 'layer'])('removal from a %s', (parent): void => {
    it.each(['audio', 'layer'])(
      'disposes audio exactly once when removing the %s instance',
      (removedType): void => {
        const { pause, play } = stubAudio();
        const remove = vi.spyOn(AudioInstance.prototype, 'remove');
        const reconciler = new BrowserReconciler();
        const canvas = createCanvas();
        const onError = vi.fn();
        const layerProps = { height: 100, width: 100, x: 0, y: 0 };
        const renderScene = (includeSubtree: boolean): void => {
          const audio = createElement('audio', {
            loop: true,
            src: `/removed-${parent}-${removedType}.ogg`,
            volume: 50,
          });
          let subtree: ReactNode = null;
          if (includeSubtree) {
            subtree =
              removedType === 'audio'
                ? audio
                : createElement(
                    'layer',
                    layerProps,
                    createElement('layer', layerProps, audio),
                  );
          }
          reconciler.render(
            parent === 'layer'
              ? createElement('layer', layerProps, subtree)
              : subtree,
            canvas,
            onError,
          );
          reconciler.flushPassiveEffects();
        };

        renderScene(true);
        // Update before deletion so both current and alternate fibers exist.
        renderScene(true);
        expect(onError).not.toHaveBeenCalled();
        expect(play).toHaveBeenCalledTimes(1);
        expect(pause).not.toHaveBeenCalled();

        renderScene(false);
        reconciler.render(null, canvas, onError);
        reconciler.flushPassiveEffects();

        expect(onError).not.toHaveBeenCalled();
        expect(pause).toHaveBeenCalledTimes(1);
        expect(remove).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('starts playback after rendering and stops it on removal', (): void => {
    const { pause, play } = stubAudio();
    const reconciler = new BrowserReconciler();
    const canvas = createCanvas();
    const onError = vi.fn();
    const observeRender = vi.fn((): null => {
      expect(play).not.toHaveBeenCalled();
      return null;
    });

    reconciler.render(
      createElement(
        Fragment,
        null,
        createElement('audio', {
          loop: true,
          src: '/committed.ogg',
          volume: 50,
        }),
        createElement(observeRender),
      ),
      canvas,
      onError,
    );

    expect(onError).not.toHaveBeenCalled();
    expect(observeRender).toHaveBeenCalled();
    expect(play).toHaveBeenCalledTimes(1);

    reconciler.render(null, canvas, onError);

    expect(pause).toHaveBeenCalledTimes(1);
  });

  it('does not play audio when a sibling throws during rendering', (): void => {
    const { play } = stubAudio();
    const reconciler = new BrowserReconciler();
    const canvas = createCanvas();
    const onError = vi.fn();
    const renderError = new Error('Audio sibling failed to render.');
    const ThrowDuringRender = (): never => {
      throw renderError;
    };

    reconciler.render(
      createElement(
        Fragment,
        null,
        createElement('audio', {
          loop: true,
          src: '/abandoned.ogg',
          volume: 50,
        }),
        createElement(ThrowDuringRender),
      ),
      canvas,
      onError,
    );

    expect(onError).toHaveBeenCalledWith(renderError);
    expect(play).not.toHaveBeenCalled();
  });

  it('does not play audio in a suspended tree that is abandoned', (): void => {
    const { play } = stubAudio();
    const reconciler = new BrowserReconciler();
    const canvas = createCanvas();
    const onError = vi.fn();
    const pending = new Promise<never>((): void => {
      // Keep this tree suspended until it is discarded.
    });
    const SuspendDuringRender = (): never => {
      return use(pending);
    };

    reconciler.render(
      createElement(
        Suspense,
        { fallback: null },
        createElement('audio', {
          loop: true,
          src: '/suspended.ogg',
          volume: 50,
        }),
        createElement(SuspendDuringRender),
      ),
      canvas,
      onError,
    );
    reconciler.render(null, canvas, onError);

    expect(onError).not.toHaveBeenCalled();
    expect(play).not.toHaveBeenCalled();
  });
});
