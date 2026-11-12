# quisido-store

`quisido-store` is a tiny, synchronous reducer store. It holds one immutable
state value, applies a reducer on `dispatch()`, notifies subscribers, and can
export a snapshot with the metadata needed to identify a session.

It is the state layer used by
[`../quisido-browser-game`](../quisido-browser-game/README.md): every dispatch
re-renders the canvas scene.

> This is reference material: a proof of concept, not a published package.
> `packages/game/README2-design.md` treats it as disposable if the production
> engine takes a different shape.

## Goals

- **A reducer-shaped state container.** State changes go through a pure
  `(state, action) => state` function.
- **Synchronous notifications.** When `dispatch()` returns, every subscriber
  has run and the new state is visible.
- **A serializable snapshot.** `toJSON()` returns the state together with a
  `seed` and `timestamp`, which are useful for saving, replay, or reproducing a
  session.
- **Almost no API surface.** There are no middleware, enhancers, action
  creators, or framework bindings to learn.

## API

```ts
interface Export<State> {
  readonly seed: number;
  readonly state: State;
  readonly timestamp: number;
}

interface Options<State, Action> {
  readonly initialState: State;
  readonly reducer: Reducer<State, Action>;
  readonly seed: number;
  readonly timestamp: number;
}
```

| Member                      | Behavior                                                                                                          |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `new QuisidoStore(options)` | Stores the initial state, reducer, seed, and timestamp.                                                           |
| `dispatch(action)`          | Computes `reducer(state, action)`, replaces the state, and synchronously calls every listener with the new state. |
| `onChange(listener)`        | Adds a listener and returns an unsubscribe function. Listeners are not called immediately.                        |
| `state`                     | Getter for the current state.                                                                                     |
| `toJSON()`                  | Returns `{ seed, state, timestamp }`. The state is returned by reference, not cloned.                             |

`Reducer<State, Action>` is defined in `reducer.ts` as:

```ts
type Reducer<State, Action> = (state: State, action: Action) => State;
```

`stringifiable.ts` provides recursive JSON-friendly types for state that must
survive serialization:

```ts
type Stringifiable =
  boolean | null | number | string | StringifiableArray | StringifiableRecord;

type StringifiableArray = readonly Stringifiable[];

type StringifiableRecord = {
  readonly [K in string]?: Stringifiable | undefined;
};
```

The store itself accepts any state type. `BrowserGame` is the part that
constrains state to `StringifiableRecord`, because it expects the game state to
be exportable.

## Usage

```ts
import QuisidoStore, { type Reducer } from './index.js';

type State = {
  readonly count: number;
};

type Action = {
  readonly type: 'increment';
};

const reducer: Reducer<State, Action> = (state, action) =>
  action.type === 'increment' ? { count: state.count + 1 } : state;

const store = new QuisidoStore<State, Action>({
  initialState: { count: 0 },
  reducer,
  seed: 1,
  timestamp: Date.now(),
});

const unsubscribe = store.onChange((state): void => {
  window.console.log(state.count);
});

store.dispatch({ type: 'increment' });
unsubscribe();

const snapshot = store.toJSON();
```

## When to use

Use this module when:

- You need a very small state container with a reducer and subscriptions.
- State changes should be deterministic and easy to replay from a seed and
  snapshot.
- You want synchronous updates, such as re-rendering a canvas immediately after
  an action.
- You are reading or extending the canvas reference implementation.

Do not use this module when:

- You need a general application state library. Use Redux, Zustand, or similar.
- You need middleware, devtools, async actions, selectors, or derived state.
- You need persistence, schema validation, or immutable-update enforcement.
- You need batching or transactions. Each dispatch notifies immediately.

## Limitations

- Every `dispatch()` notifies listeners even when the reducer returns the same
  state. There is no equality check.
- Listeners run synchronously and in `Set` insertion order. An exception thrown
  by a listener propagates out of `dispatch()` and prevents later listeners from
  running.
- `onChange()` does not invoke the listener with the current state; callers must
  read `store.state` if they need an initial value.
- `toJSON()` does not clone or stringify the state. Mutating the returned state
  also mutates the store's state.
- `seed` and `timestamp` are opaque metadata. The store does not use them for
  random numbers, ordering, or replay; those responsibilities belong to the
  caller.
- There is no middleware, devtools integration, time travel, action logging, or
  async support.

## Files

| File               | Purpose                                                      |
| ------------------ | ------------------------------------------------------------ |
| `quisido-store.ts` | `QuisidoStore`, its options, and the `Export` snapshot type. |
| `reducer.ts`       | The `Reducer<State, Action>` type.                           |
| `stringifiable.ts` | Recursive JSON-friendly state types.                         |
| `index.ts`         | Public exports.                                              |
