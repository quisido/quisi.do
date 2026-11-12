# quisido-browser-game

`quisido-browser-game` is the browser/canvas host implementation of
[`../quisido-reconciler`](../quisido-reconciler/README.md). React elements
describe a 2D scene, and each host element becomes an instance that draws into
an `HTMLCanvasElement` or an `OffscreenCanvas`.

> This is reference material: a proof of concept, not a published package.
> `packages/game/README2-design.md` explicitly treats the existing
> `quisido-store` and reconciler code as disposable.

## Goals

- **Declarative canvas scenes.** Compose sprites, layers, text, and audio with
  React instead of writing imperative draw calls.
- **Layer composition.** Each `<layer>` renders into its own offscreen canvas,
  so moving or hiding a layer does not require redrawing every child into the
  visible canvas.
- **An image pipeline.** Images are cached, loaded, cropped, resized, and
  decoded with `createImageBitmap`, keeping resize work off the main thread
  where the browser supports it.
- **Audio lifecycle.** `<audio>` elements start when mounted and stop when
  removed or replaced.
- **Simple game integration.** `BrowserGame` connects a reducer store to the
  reconciler and re-renders the scene whenever state changes.

## Architecture

| Piece                 | Responsibility                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `BrowserReconciler`   | Subclasses `QuisidoReconciler`, creates browser instances by element type, and caches one `BrowserContainer` per canvas. |
| `BrowserContainer`    | Root container. Owns the canvas 2D context, the child list, and full-canvas redraws.                                     |
| `LayerInstance`       | `<layer>` host element. Renders children into an `OffscreenCanvas` and exposes it as a `CanvasImageSource`.              |
| `DrawImageInstance`   | `<draw-image>` host element. Loads and resizes an image, then exposes it as a `CanvasImageSource`.                       |
| `AudioInstance`       | `<audio>` host element. Starts playback on mount and stops it on removal.                                                |
| `TextInstance`        | `<text>` host element. A stylized-text placeholder; text rendering is not implemented yet.                               |
| `BrowserTextInstance` | Plain text node used by the reconciler for text children.                                                                |

The container and every layer subscribe to renderable children. When a child
changes, the parent clears its own surface and redraws its children in order.
This is a straightforward full-redraw strategy, not a dirty-rectangle renderer.

### Supported elements

Element types are defined by the `Type` enum and typed by `Props`:

| Element        | Props                                                            | Behavior                                                                                                                                                    |
| -------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<layer>`      | `x`, `y`, `width`, `height`; children                            | Creates an `OffscreenCanvas` of `width` × `height`, draws children into it, and composites it at `x`, `y`. Layers nest.                                     |
| `<draw-image>` | `src`, `x`, `y`, `width`, `height`; optional `source`, `quality` | Leaf. Loads `src`, optionally crops with `source` (`x`, `y`, `width`, `height`), resizes to `width` × `height` with `ResizeQuality`, and draws at `x`, `y`. |
| `<audio>`      | `src`, `loop`, `volume` (0–100)                                  | Leaf. Plays on mount; pauses and resets on removal. Prop changes restart playback.                                                                          |
| `<text>`       | `children: string`                                               | Leaf. Currently a stub: `TextInstance` throws for most host methods and does not paint text.                                                                |

`DrawImageInstance` draws a 1 × 1 empty offscreen canvas until its image
finishes loading, so the scene does not block on network or decode work.
`LayerInstance` does the same while hidden.

### BrowserGame

`BrowserGame` is the high-level entry point. Its constructor creates a
`QuisidoStore`, a `BrowserReconciler`, subscribes to store changes, and renders
immediately. State is passed to the `Game` component as props.

```ts
import { createElement, type FunctionComponent } from 'react';
import BrowserGame, { preloadImage } from './index.js';

type State = {
  readonly x: number;
  readonly y: number;
};

type Action = {
  readonly type: 'move';
  readonly x: number;
  readonly y: number;
};

const Game: FunctionComponent<State> = ({ x, y }) =>
  createElement(
    'layer',
    { height: 600, width: 800, x: 0, y: 0 },
    createElement('draw-image', {
      height: 64,
      src: '/sprites/hero.png',
      width: 64,
      x,
      y,
    }),
  );

preloadImage('/sprites/hero.png');

const game = new BrowserGame<State, Action>({
  canvas,
  Game,
  initialState: { x: 0, y: 0 },
  reducer: (state, action): State =>
    action.type === 'move' ? { x: action.x, y: action.y } : state,
});

game.dispatch({ type: 'move', x: 10, y: 10 });
game.stop();
```

`start()` re-subscribes and renders; `stop()` only unsubscribes. It does not
clear the canvas or stop audio that is already playing. `toJSON()` returns the
store's `{ seed, state, timestamp }` snapshot.

### Direct rendering

You can use the reconciler without the store:

```ts
import { createElement } from 'react';
import BrowserReconciler from './browser-reconciler.js';

const reconciler = new BrowserReconciler();

reconciler.render(
  createElement('layer', { height: 600, width: 800, x: 0, y: 0 }),
  canvas,
  (error: Error): void => {
    window.console.error(error);
  },
);
```

`BrowserReconciler.render(element, canvas, onError, callback?)` looks up or
creates a `BrowserContainer` for the canvas and delegates to the synchronous
`update()` inherited from `QuisidoReconciler`.

The exported `Jsx` type unions `ReactElement` types for `audio`, `draw-image`,
and `layer` elements. It is useful when a helper should accept only the
supported host elements.

## When to use

Use this module when:

- You want a small, declarative 2D canvas scene graph for a prototype or game.
- Sprite layering, offscreen composition, and simple audio are enough.
- You are reading the reference implementation before designing the production
  renderer described in `README2-design.md`.

Do not use this module when:

- You need WebGL, 3D, shaders, or high-performance sprite batching.
- You need pointer, keyboard, or gamepad input. There is no event system here.
- You need DOM UI. Render React DOM separately and keep the canvas isolated.
- You need production-grade text layout. `<text>` is a placeholder.

## Limitations

- Every change redraws the affected container or layer completely; there is no
  dirty-rectangle tracking.
- Image loading is asynchronous. Until a bitmap resolves, the image draws as an
  empty canvas. `DrawImageInstance.update()` mentions commit suspension, but
  `BrowserReconciler.maySuspendCommit()` currently returns `false` for images.
- `<text>` and `TextInstance` are incomplete. `BrowserTextInstance` stores text
  but does not paint it.
- Audio playback is subject to browser autoplay rules. `NotAllowedError` is
  ignored, so audio may silently not play until the user interacts.
- Layers allocate an `OffscreenCanvas` each. Large or numerous layers consume
  memory, and resizing a layer clears its canvas.
- `BrowserGame` hardcodes `seed: 1` and `timestamp: Date.now()` when it creates
  its store.
- The generic reconciler's limitations also apply: no hydration, no forms, no
  event system, and synchronous commits.

## Files

| File                                              | Purpose                                                     |
| ------------------------------------------------- | ----------------------------------------------------------- |
| `browser-game.tsx`                                | `BrowserGame`: store + reconciler integration.              |
| `browser-reconciler.tsx`                          | Element factories and `BrowserContainer` cache.             |
| `browser-container.ts`                            | Canvas root container and redraw loop.                      |
| `layer-instance.ts`                               | Offscreen-canvas layer implementation.                      |
| `draw-image-instance.ts`                          | Image loading, cropping, resizing, and drawing.             |
| `audio-instance.ts`                               | Audio mount/update/remove lifecycle.                        |
| `text-instance.ts`                                | Stub for stylized text.                                     |
| `browser-text-instance.ts`                        | Plain text node storage.                                    |
| `browser-family.ts`                               | Union of all browser host instance types.                   |
| `type.ts`, `props.ts`, `jsx.ts`                   | Element type enum, props, and typed JSX element union.      |
| `image-preloader.ts`                              | `getImage`, `preloadImage`, and `preloadImages`.            |
| `play-audio.ts`                                   | Shared `HTMLAudioElement` cache and playback helper.        |
| `insert-child.ts`                                 | Ordered child insertion for containers and layers.          |
| `is-renderable-instance.ts`                       | Duck-typed check for instances that expose a canvas source. |
| `map-canvas-to-2d-rendering-context.ts`           | Canvas 2D context creation for the visible canvas.          |
| `map-offscreen-canvas-to-2d-rendering-context.ts` | Canvas 2D context creation for layers.                      |
| `empty-offscreen-canvas.ts`                       | Shared 1 × 1 placeholder bitmap.                            |
| `async-map.ts`, `sync-map.ts`                     | Cached factory helpers used by image and audio loaders.     |
| `fps-counter.ts`                                  | Optional frame-rate sampler.                                |
| `tuple.ts`                                        | Mutable two-value pair used by `LayerInstance`.             |
| `noop.ts`                                         | Shared no-op callback.                                      |
| `index.ts`                                        | Public exports.                                             |
