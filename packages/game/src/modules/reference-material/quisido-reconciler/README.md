# quisido-reconciler

`quisido-reconciler` is a small, platform-agnostic host renderer built on
[`react-reconciler`](https://www.npmjs.com/package/react-reconciler). It turns
React's render and commit phases into calls on three host contracts, so the same
React component tree can drive any render target instead of the DOM.

This directory is the generic half of the canvas renderer. The browser-specific
half lives in [`../quisido-browser-game`](../quisido-browser-game/README.md).

> This is reference material: a proof of concept, not a published package.
> `packages/game/README2-design.md` treats it as disposable if the production
> engine takes a different shape.

## Goals

- **No DOM assumptions.** The reconciler imports nothing from the browser and
  knows nothing about `<canvas>`, images, or audio.
- **A minimal host contract.** A render target only implements `Container`,
  `Instance`, and `TextInstance`; everything else is React plumbing.
- **Synchronous, predictable commits.** `update()` uses
  `updateContainerSync()` followed by `flushSyncWork()`, so a render is
  complete when the call returns.
- **Modern React behavior.** It creates a concurrent root with Strict Mode
  enabled, supports Suspense hide/unhide, reports errors through the caller's
  `onError`, and registers renderer metadata with React DevTools.
- **Reusability.** A renderer subclasses `QuisidoReconciler` once per target and
  supplies platform-specific factories and timers.

## Architecture

React calls the host config methods configured in
`quisido-reconciler.tsx`. Those methods delegate to three small interfaces:

| Interface      | Responsibility                                                                          |
| -------------- | --------------------------------------------------------------------------------------- |
| `Container`    | The root render target. Owns `appendChild`, `insertBefore`, `removeChild`, and `clear`. |
| `Instance`     | A host element. Owns child insertion/removal, visibility, and commit-time updates.      |
| `TextInstance` | A text node. Owns visibility and text updates.                                          |

`QuisidoReconciler` never inspects the concrete classes. The type parameters
tie each element type to its props and its instance implementation:

```ts
class MyReconciler extends QuisidoReconciler<
  ElementType,
  PropsByType,
  MyTextInstance,
  MyInstanceUnion,
  MyContainer
> {}
```

### Commit lifecycle

- `createInstance(type, props, rootContainer)` constructs a host instance.
- `Instance.update(prevProps, nextProps)` runs during the commit phase. This is
  where an instance draws or otherwise applies its new props.
- `Instance.mount?.(props)` runs after the instance is committed, but only when
  `finalizeInitialChildren` returned `true` (which it does when `mount` exists).
- `Instance.remove?.()` runs once when the instance is deleted. Repeated
  deletion visits are deduplicated.
- `Instance.hide()` / `Instance.unhide(props)` and the matching text methods
  implement Suspense-style visibility.
- `Instance.resetTextContent?.()` clears text content when React decides to
  replace an element's children with text.

The optional `maySuspendCommit(type, props)` option can delay a commit while a
resource is loading. It defaults to `false`.

### Constructor options

| Option                 | Required | Purpose                                                    |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `createInstance`       | Yes      | Builds a host instance from an element type and its props. |
| `createTextInstance`   | Yes      | Builds a text node from a string.                          |
| `shouldSetTextContent` | Yes      | Tells React whether an element's children are plain text.  |
| `cancelTimeout`        | Yes      | Cancels a timeout created by `scheduleTimeout`.            |
| `scheduleMicrotask`    | Yes      | Schedules a microtask for React's internal work.           |
| `scheduleTimeout`      | Yes      | Schedules a timeout for React's internal work.             |
| `maySuspendCommit`     | No       | Returns `true` to delay a commit while a resource loads.   |

### React context

`QuisidoReactContext` and `QuisidoReactConsumerType` implement the minimal
context shape React expects for `HostTransitionContext`. They exist so the host
config can provide a valid transition context without importing React DOM.

## Usage

Subclass `QuisidoReconciler` and provide the host factories and timers:

```ts
import { type ReactNode } from 'react';
import QuisidoReconciler, {
  type Container,
  type Instance,
  type TextInstance,
} from './index.js';

type ElementType = 'box';
interface BoxProps {
  readonly size: number;
}
type Props = { readonly box: BoxProps };
type Text = TextInstance;
type Family = Instance<BoxProps, Text, Family>;
type Root = Container<Text, Family>;

class BoxReconciler extends QuisidoReconciler<
  ElementType,
  Props,
  Text,
  Family,
  Root
> {
  public constructor() {
    super({
      cancelTimeout: (id: number): void => window.clearTimeout(id),
      createInstance: (type: ElementType, props: BoxProps): Family =>
        new BoxInstance(props),
      createTextInstance: (text: string): Text => new BoxTextInstance(text),
      scheduleMicrotask: (fn: VoidFunction): void => window.queueMicrotask(fn),
      scheduleTimeout: (fn, delay?: number): number =>
        window.setTimeout(fn, delay),
      shouldSetTextContent: (): boolean => false,
    });
  }

  public render(
    element: ReactNode,
    container: Root,
    onError: (error: Error) => void,
  ): void {
    this.update(element, container, onError);
  }
}
```

The example assumes `BoxInstance` implements `Instance` and `BoxTextInstance`
implements `TextInstance`.

`update(element, container, onError, callback?)` is the only method the class
adds. It creates and caches one opaque root per container, then renders
synchronously. The rest of the `Reconciler` interface is delegated unchanged,
so advanced callers can use `flushPassiveEffects`, `batchedUpdates`,
`createPortal`, and the other upstream methods if their host supports them.

## When to use

Use this module when:

- You are building a custom React renderer for a non-DOM target (canvas, WebGL,
  native, terminal, or a test harness).
- You want one place that owns React 19 host-config plumbing, error callbacks,
  Strict Mode, and synchronous commits.
- You are extending `quisido-browser-game` and need to understand or replace its
  generic layer.

Do not use this module when:

- You are rendering DOM UI. Use `react-dom`.
- You only need imperative canvas drawing. A React tree adds indirection without
  benefit unless composition and declarative updates matter.
- You need hydration, forms, activity boundaries, or a complete event system.
  Those host-config capabilities are intentionally stubbed here.

## Limitations

- Hydration is unsupported (`supportsHydration: false`).
- `FormInstance` is `never`; activity and form state markers are not
  implemented.
- Suspense is limited to hide/unhide. There is no fallback instance management,
  and commit-suspension hooks return `null` or `false`.
- There is no event system: `resolveEventType()` returns `null`,
  `resolveEventTimeStamp()` returns `0`, and no synthetic events are dispatched
  to host instances.
- Rendering is synchronous. Long trees block the caller; there is no public
  concurrent rendering path.
- Persistence and mutation are mutually exclusive in React's host config, and
  only mutation mode is enabled.

## Files

| File                             | Purpose                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| `quisido-reconciler.tsx`         | Host config, opaque root cache, sync `update()`, and delegation to React's reconciler. |
| `container.ts`                   | `Container` interface for the root render target.                                      |
| `instance.ts`                    | `Instance` interface for host elements.                                                |
| `text-instance.ts`               | `TextInstance` interface for text nodes.                                               |
| `quisido-react-context.ts`       | Minimal `ReactContext` implementation for `HostTransitionContext`.                     |
| `quisido-react-consumer-type.ts` | Minimal `ReactConsumerType` used by the context.                                       |
| `constants.ts`                   | Version and bundle-type constants.                                                     |
| `method-keys.ts`                 | Type helper for delegating the upstream `Reconciler` methods.                          |
| `transition-status.ts`           | `TransitionStatus` enum required by the host config.                                   |
| `index.ts`                       | Public exports.                                                                        |
