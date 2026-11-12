# Bugs

## High-impact bugs

1. QuisidoReactContext is not a usable React context.
   `quisido-reconciler/quisido-react-context.ts:32-38` defines `_currentValue`
   and `_currentValue2` as getter-only properties, but React assigns to those
   fields in `pushProvider`, `popProvider`, and `pushHostContext`. Assignment
   throws:
   ```
   TypeError: Cannot set property _currentValue of #<QuisidoReactContext> which
   has only a getter
   ```
   Additionally, `typeOf` is a custom symbol
   (`Symbol.for('@quisido/reconciler')` in `quisido-reconciler.tsx:352-356`),
   not React’s context symbol. Rendering `context.Provider` fails with “Element
   type is invalid.” The Consumer type has the same issue.
   **Impact:** `HostTransitionContext` can throw when React updates
   host-transition state, and the class cannot actually be used as a context.
   Fix by using `React.createContext`, or by adding setters and the correct
   React context/consumer symbols.
2. `BrowserGame.start()` creates duplicate subscriptions.
   `browser-game.tsx:41` calls `start()` in the constructor. `start()` at
   `:60-63` subscribes without checking whether it is already subscribed.
   Calling `start()` again adds another listener, so each `dispatch()` renders
   multiple times. My test observed 4 renders after one `start()` and one
   `dispatch()`.
   **Fix:** guard with `if (this.#unsubscribe !== undefined) return;`, or
   unsubscribe before resubscribing. Also set `#unsubscribe = undefined` in
   `stop()`.
3. Audio instances share one `HTMLAudioElement` per `src`.
   `play-audio.ts:9-11,27` caches `HTMLAudioElement` instances in a `SyncMap`
   keyed only by `src`. Two `<audio>` instances with the same source therefore
   control the same element: stopping or updating one pauses/restarts all of
   them. Overlapping copies of the same sound effect are impossible.
   **Fix:** create one element per `AudioInstance`, or clone/pool elements per
   playback. Cache the decoded source or URL, not the mutable element.
4. `<text>` renders nothing.
   `browser-reconciler.tsx:33-34` maps `Type.Text` to `TextInstance`, but
   `text-instance.ts:11-36` is a stub: `update()` is a no-op and most other
   methods throw. `shouldSetTextContent()` returns `true` for `Type.Text`
   (`browser-reconciler.tsx:65`), so React does not create `BrowserTextInstance`
   children for `<text>` either.
   I confirmed that rendering `<text>hello</text>` produces no error and no
   drawing. `BrowserTextInstance.update()` (`browser-text-instance.ts:40-42`)
   also never notifies a parent.
   **Fix:** implement text rendering (for example, draw into an offscreen canvas
   and expose it as a `CanvasImageSource`).
5. `clearContainer` does not clear host children.
   `quisido-reconciler.tsx:169-171` maps React’s `clearContainer` host-config
   method to `container.clear()`. `browser-container.ts:42-52` only calls
   `clearRect`; it leaves `#children` and `#renderUnsubscriptions` intact.
   If React invokes `clearContainer`, stale instances remain in the container
   and keep triggering redraws. Fix by separating “clear pixels” (used by
   `#render`) from “remove all host children and unsubscribe” (used by
   `clearContainer`).

## Medium-impact bugs

6. The first `onError` handler is cached forever.
   `quisido-reconciler.tsx:577-612` creates the opaque root once per container
   and captures the `onError` passed to that first `update()` call. Later
   renders with a different handler still report errors to the original handler.
   **Fix:** keep a mutable error handler per root, or create the root with a
   dispatcher that reads the current handler field.
7. `StringifiableRecord` rejects interface-based state.
   `quisido-store/stringifiable.ts:6-8` uses an index-signature-like mapped
   type. `BrowserGame` requires `State extends StringifiableRecord`
   (`browser-game.tsx:17`), so this fails:
   ```ts
   interface State {
     readonly x: number;
   }
   ```
   with:
   ```
   TS2344: Type 'State' does not satisfy the constraint 'StringifiableRecord'.
     Index signature for type 'string' is missing in type 'State'.
   ```
   Type aliases work, interfaces do not. Fix with a mapped constraint over
   `keyof State`, for example:
   ```ts
   type JsonRecord<T extends object> = {
     readonly [K in keyof T]: Stringifiable;
   };
   ```
8. `maySuspendCommit` contradicts the image implementation.
   `draw-image-instance.ts:204` says the commit is delayed via
   `maySuspendCommit` until the image loads, but `browser-reconciler.tsx:41-54`
   always returns `false` for `DrawImage`. The generic reconciler also returns
   `null` from `startSuspendingCommit()` and `waitForCommitToBeReady()`, so
   commit suspension is not implemented at all.
   **Result:** an image update commits immediately and draws the empty
   placeholder until loading finishes. Implement the suspension hooks or
   remove the comment and document the placeholder behavior.
9. Layers reallocate their offscreen canvas on every render.
   `layer-instance.ts:135-140` sets `offscreenCanvas.height` and `.width` on
   every `#renderOffscreen()` call, even when dimensions are unchanged. That
   clears the backing store and resets context state every frame, and the
   preceding `clear()` is redundant.
   **Fix:** only resize when width or height actually changed.
10. Each child update causes a full parent redraw.
    `browser-container.ts:91-102` and `layer-instance.ts:135-154` redraw the
    entire parent surface whenever any renderable child notifies them. A commit
    updating N sprites therefore performs N full clears and redraws. For a game
    loop this is a significant performance bug.
    **Fix:** batch render notifications per commit (for example, via a microtask
    or `resetAfterCommit`), or implement dirty-rectangle tracking.
11. Container/layer error handlers are never wired.
    `browser-reconciler.tsx:95` constructs `new BrowserContainer(canvas)` without
    an `onError`, and `:32` constructs `new LayerInstance(props)` without one.
    Both classes fall back to `noop` (`browser-container.ts:28`,
    `layer-instance.ts:45`), so internal invariant errors are silently swallowed.
    **Fix:** pass a handler into the container/layer factories, ideally the
    current render call’s `onError`.
12. Image failures and caches are permanent.
    `image-preloader.ts:22,37` caches both HTMLImageElements and decoded bitmaps
    forever. A transient load failure resolves to `EMPTY_OFFSCREEN_CANVAS` and is
    cached, so that `src` never retries. Unique dynamic srcs also grow both maps
    without bound.
    **Fix:** evict failed entries, allow explicit retry, and consider a
    bounded/LRU cache for decoded images.
13. `BrowserGame.stop()` does not stop the game.
    `browser-game.tsx:65-67` only unsubscribes from the store. The current canvas
    frame remains visible and audio already playing continues.
    **Fix:** Unmount/clear the renderer and stop audio.
14. Unknown element types return `undefined`.
    `browser-reconciler.tsx:22-36` has no default case. Rendering an unsupported
    string tag makes `createInstance()` return `undefined`, producing a confusing
    downstream React error.
    **Fix:** add a default case that throws a descriptive error naming the
    unsupported element type.
15. Jsx omits the text element
    `jsx.ts:8-11` unions audio, draw-image, and layer but not text, even though
    `Type.Text` and `TextProps` exist. Add `ReactElement<TextProps, 'text'>` for
    consistency.

## Lower-priority issues

- `play-audio.ts:29` does not clamp volume; values outside 0–100 can set
  `HTMLMediaElement.volume` outside 0–1 and throw.
- `audio-instance.ts:39-50` restarts playback when only volume or loop changes.
  Update those properties directly and restart only on `src` changes.
- `play-audio.ts:13-19` ignores `NotAllowedError` but still stores the stop
  function, so blocked `autoplay` is never retried after a user gesture.
- `image-preloader.ts:16-18` types the `<img>` error event as `ErrorEvent`; it
  is normally a plain `Event`, so `event.message` is usually `undefined`.
- `browser-container.ts:42-52` does not reset the 2D transform before
  `clearRect`; an external transform can make the clear incomplete.
- `quisido-reconciler.tsx:73-74,212,288` writes `#initialChildrenFinalized` and
  `#instanceCreated` but never reads them.
- `async-map.ts:15-19` caches rejected promises forever; callers of a rejecting
  getter cannot retry.
- `fps-counter.ts:27` divides by `#duration` without validating it; `0` yields
  `Infinity`.
- `insert-child.ts:20-22` silently appends when `beforeChild` is not found; a
  stale anchor can reorder children unexpectedly.
- `browser-container.ts` / `layer-instance.ts` do not catch `drawImage`
  exceptions; one invalid child can abort the whole frame.
