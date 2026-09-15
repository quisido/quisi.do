# Game engine API examples

```ts
import { createGame } from '@quisido/game-engine';
```

APIs without one clear industry convention are compared in
[`opinionated.md`](./opinionated.md). APIs that would expose an implementation
detail are isolated in [`coupled.md`](./coupled.md).

## Smallest complete game

A reducer-driven counter should require no knowledge of ticks, entities,
snapshots, or networking.

```ts
import { expect } from 'vitest';
import { createGame } from '@quisido/game-engine';

interface CounterState {
  readonly count: number;
}

type CounterAction = { readonly type: 'primary-action' };

const counterGame = createGame<CounterState, CounterAction>({
  initialState: (): CounterState => ({ count: 0 }),
  reduce: (state, action): CounterState => {
    switch (action.type) {
      case 'primary-action':
        return { ...state, count: state.count + 1 };
    }
  },
  version: 1,
});

const engine = counterGame.createEngine({ seed: 42, timestamp: 0 });

engine.dispatch({ type: 'primary-action' });

expect(engine.state.count).toBe(1);
```

`dispatch` accepts an action, while the engine owns event metadata such as its
canonical timestamp, source, and authority-assigned sequence. This keeps ordinary
game code as approachable as Redux-style state management without making game
authors construct transport records.

## Independent instances

Every call to `createEngine` creates an isolated simulation. State returned by
the engine is read-only, and a transition never mutates a previously observed
state value.

```ts
const first = counterGame.createEngine({ seed: 42, timestamp: 0 });
const second = counterGame.createEngine({ seed: 42, timestamp: 0 });
const before = first.state;

first.dispatch({ type: 'primary-action' });

expect(first.state.count).toBe(1);
expect(second.state.count).toBe(0);
expect(before).toEqual({ count: 0 });
expect(first.state).not.toBe(before);
```

## Replayable randomness

Randomness is available only while the engine is processing an action or a
system. A game cannot accidentally use ambient `Math.random()` as authoritative
state. The engine records the random stream position as part of replayable state,
but game authors do not manage that cursor themselves.

```ts
import { expect } from 'vitest';
import { createGame } from '@quisido/game-engine';

interface DiceState {
  readonly rolls: readonly number[];
}

type DiceAction = { readonly type: 'roll' };

const diceGame = createGame<DiceState, DiceAction>({
  initialState: (): DiceState => ({ rolls: [] }),
  reduce: (state, action, context): DiceState => {
    switch (action.type) {
      case 'roll': {
        const roll = context.randomInteger({ maximum: 6, minimum: 1 });
        return { ...state, rolls: [...state.rolls, roll] };
      }
    }
  },
  version: 1,
});

const play = (seed: number) => {
  const engine = diceGame.createEngine({ seed, timestamp: 0 });
  engine.dispatch({ type: 'roll' });
  engine.dispatch({ type: 'roll' });
  engine.dispatch({ type: 'roll' });
  return engine.state.rolls;
};

expect(play(123)).toEqual(play(123));
expect(play(123)).not.toEqual(play(456));
```

The second assertion documents the streams for these representative seeds. The
load-bearing guarantee is that the same seed and the same actions reproduce the
same values.

Saving and loading resumes the stream without a special random API:

```ts
const engine = diceGame.createEngine({ seed: 123, timestamp: 0 });
engine.dispatch({ type: 'roll' });

const restored = diceGame.restore(engine.save());

engine.dispatch({ type: 'roll' });
restored.dispatch({ type: 'roll' });

expect(restored.state.rolls).toEqual(engine.state.rolls);
```

## Deterministic math

Game systems import deterministic transcendental functions from the public
entrypoint. Ordinary finite `+`, `-`, `*`, `/`, and `Math.sqrt` remain available.

```ts
import { deterministicMath } from '@quisido/game-engine';

const rotate = (x: number, y: number, angle: number) => ({
  x: x * deterministicMath.cos(angle) - y * deterministicMath.sin(angle),
  y: x * deterministicMath.sin(angle) + y * deterministicMath.cos(angle),
});
```

For the same finite input, these functions return the same frozen result on every
supported JavaScript engine. Native transcendental math, exponentiation,
`Date.now()`, and `Math.random()` are rejected in authoritative game systems by
the engine's development tooling.

## Time and ordered systems

Systems are pure state transitions. They run in the order supplied by the game,
once per elapsed integer millisecond. The engine exposes the tick being processed
through context and advances its public `timestamp` after all systems finish.

```ts
import { createGame, type System } from '@quisido/game-engine';

interface MotionState {
  readonly position: number;
  readonly velocity: number;
}

type MotionAction = { readonly type: 'stop' };

const move: System<MotionState> = (state): MotionState => ({
  ...state,
  position: state.position + state.velocity,
});

const stopAtWall: System<MotionState> = (state): MotionState =>
  state.position < 20
    ? state
    : { ...state, position: 20, velocity: 0 };

const motionGame = createGame<MotionState, MotionAction>({
  initialState: () => ({ position: 0, velocity: 0.01 }),
  reduce: (state, action) =>
    action.type === 'stop' ? { ...state, velocity: 0 } : state,
  systems: [move, stopAtWall],
  version: 1,
});

const engine = motionGame.createEngine({ seed: 1, timestamp: 0 });
engine.advanceTo(5_000);

expect(engine.timestamp).toBe(5_000);
expect(engine.state.position).toBe(20);
expect(engine.state.velocity).toBe(0);
```

`advanceTo` is composable and never integrates backwards:

```ts
const inOneCall = motionGame.createEngine({ seed: 1, timestamp: 0 });
inOneCall.advanceTo(1_500);

const inTwoCalls = motionGame.createEngine({ seed: 1, timestamp: 0 });
inTwoCalls.advanceTo(700);
inTwoCalls.advanceTo(1_500);

expect(inTwoCalls.state).toEqual(inOneCall.state);
expect(inTwoCalls.advanceTo(500)).toBe(inTwoCalls.state);
```

`step` is useful for tests and fixed-step hosts:

```ts
const before = engine.state;
const after = engine.step();

expect(engine.timestamp).toBe(5_001);
expect(after).toBe(engine.state);
expect(after).not.toBe(before);
```

Emergent behavior such as collisions, timer fires, clamping, and spawns belongs
in systems. Authors do not dispatch synthetic collision or timer actions merely
to make replay work; replay runs the systems again.

The configured system order is copied when the game is defined; later mutation
of the caller's array cannot reorder a running game. Each system observes the
previous system's output, including entities spawned earlier in the same tick.
Entity queries and simultaneous collision resolution use stable ascending entity
identity. A collision system must also stop an entity whose single-step path
crosses a collider, even when its final point would be beyond that collider.

## Invalid state fails fast

Integer time and finite normalized numbers are part of the public contract.
Errors are reported at the transition that produced them, with enough non-private
context to identify the game, action, system, and tick.

```ts
expect(() =>
  counterGame.createEngine({ seed: 42, timestamp: 0.5 }),
).toThrow(/integer timestamp/i);

type BrokenAction = { readonly type: 'break-score' };

const brokenGame = createGame<{ readonly score: number }, BrokenAction>({
  initialState: () => ({ score: 0 }),
  reduce: () => ({ score: Number.NaN }),
  version: 1,
});
const brokenEngine = brokenGame.createEngine({ seed: 42, timestamp: 0 });

expect(() =>
  brokenEngine.dispatch({ type: 'break-score' }),
).toThrow(/finite.*score/i);
```

The same boundary rejects positive or negative infinity, negative zero,
fractional event timestamps, fractional authority sequences, and a system or
reducer that changes simulation time directly. It also defensively copies input
data so later mutation by the caller cannot change replayable state.

## Timestamped actions

Calling `dispatch(action)` is the normal input path. Tests, replays, and hosts
that already have canonical game time may supply it explicitly.

```ts
interface LaunchState {
  readonly launched: boolean;
  readonly position: number;
}

type LaunchAction = { readonly type: 'launch' };

const launchGame = createGame<LaunchState, LaunchAction>({
  initialState: () => ({ launched: false, position: 0 }),
  reduce: (state): LaunchState => ({ ...state, launched: true }),
  version: 1,
});

const engine = launchGame.createEngine({ seed: 1, timestamp: 100 });

engine.dispatch({ type: 'launch' }, { timestamp: 250 });

expect(engine.timestamp).toBe(250);
expect(engine.state.launched).toBe(true);
```

The engine advances systems to `250` before reducing `launch`. Multiple actions
at `250` reduce in authority sequence without an extra step between them. An
action earlier than confirmed simulation time is rejected rather than silently
integrating backwards.

```ts
expect(() =>
  engine.dispatch({ type: 'launch' }, { timestamp: 249 }),
).toThrow(/before.*250/i);
```

## Serializable input

Actions are plain data. Browser, controller, or network objects are translated at
the edge and never enter state or the replay log.

```ts
type InputAction =
  | { readonly type: 'key-pressed'; readonly key: string }
  | {
      readonly type: 'pointer-moved';
      readonly pointer: { readonly x: number; readonly y: number };
    }
  | {
      readonly type: 'gamepad-changed';
      readonly axes: readonly number[];
      readonly buttons: readonly number[];
    };

canvas.addEventListener('pointermove', (event): void => {
  engine.dispatch({
    pointer: { x: event.offsetX, y: event.offsetY },
    type: 'pointer-moved',
  });
});

window.addEventListener('keydown', (event): void => {
  engine.dispatch({ key: event.key, type: 'key-pressed' });
});
```

Touch, click, and drag are represented as pointer actions with serializable
coordinates and phases. Raw `KeyboardEvent`, `PointerEvent`, `TouchEvent`, and
`Gamepad` instances are rejected at the dispatch boundary.

## Replay

A replay consumes a snapshot and events. Input order does not matter: events are
canonically ordered by timestamp and then authority sequence without mutating the
caller's array.

```ts
import { expect } from 'vitest';
import type { GameEvent } from '@quisido/game-engine';

const snapshot = counterGame.createSnapshot({ seed: 42, timestamp: 0 });
const events: readonly GameEvent<CounterAction>[] = [
  {
    action: { type: 'primary-action' },
    sequence: 2,
    source: 'player-2',
    timestamp: 20,
  },
  {
    action: { type: 'primary-action' },
    sequence: 1,
    source: 'player-1',
    timestamp: 10,
  },
];

const first = counterGame.replay({ events, snapshot });
const second = counterGame.replay({ events: [...events].reverse(), snapshot });

expect(JSON.stringify(first)).toBe(JSON.stringify(second));
expect(events[0]?.sequence).toBe(2);
```

Equal timestamps use `sequence` as the tiebreaker. `sequence` is also event
identity for deduplication; two records with the same sequence but different
contents are a synchronization error.

Replaying after a JSON round trip yields the same result as uninterrupted play:

```ts
const halfway = counterGame.replay({ events: events.slice(0, 1), snapshot });
const reloaded = JSON.parse(JSON.stringify(halfway));
const continued = counterGame.replay({
  events: events.slice(1),
  snapshot: reloaded,
});
const uninterrupted = counterGame.replay({ events, snapshot });

expect(JSON.stringify(continued)).toBe(JSON.stringify(uninterrupted));
```

Replay stops at the final event timestamp. It never invents progress by reading a
wall clock.

## Saving and restoring

Game saves are opaque, versioned, JSON-serializable values. Game authors should
not need to know whether a save uses snapshots, event logs, or another compatible
representation.

```ts
const save = engine.save();
localStorage.setItem('save', JSON.stringify(save));

const serialized = localStorage.getItem('save');
if (serialized === null) {
  throw new Error('The save slot is empty.');
}
const parsed: unknown = JSON.parse(serialized);
const restored = counterGame.restore(parsed);

expect(restored.state).toEqual(engine.state);
expect(restored.timestamp).toBe(engine.timestamp);
```

Restoring a save from a different game version fails explicitly:

```ts
expect(() => versionTwoGame.restore(save)).toThrow(/version/i);
```

For dependency injection, the same operation can use a store port:

```ts
interface GameStore {
  load(slot: string): Promise<unknown>;
  save(slot: string, data: unknown): Promise<void>;
}

await engine.saveTo(store, 'autosave');
const restored = await counterGame.loadFrom(store, 'autosave');
```

The store sees opaque JSON data and cannot mutate the live simulation.
Compaction may replace old history with a newer snapshot, but restoring compacted
and uncompacted saves through the same final event must produce identical state.
No save exposes a redundant resulting-state copy for every event.

## Rendering projected state

Rendering receives a complete, read-only projected state. Projection starts from
the latest confirmed state on every frame, so render interpolation never becomes
authoritative simulation state.

```ts
const renderer = {
  draw(state: Readonly<MotionState>): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(state.position, 20, 10, 10);
  },
};

const stop = engine.startRendering({
  clock: { now: () => performance.now() },
  renderer,
  scheduleFrame: requestAnimationFrame,
});

// Later:
stop();
```

The engine never calls the renderer from `step`, `advanceTo`, action reduction,
or replay. A renderer may retain the previous complete state and diff it to draw
dirty rectangles without requiring a separate engine API.

## Observable state and effects

Hosts subscribe without placing callbacks in serializable game state.

```ts
const stopObservingState = engine.onStateChange((state): void => {
  updateHeadsUpDisplay(state);
});

const stopObservingEffects = engine.onEffect((effect): void => {
  switch (effect.type) {
    case 'play-sound':
      audio.play(effect.sound, effect.position);
      break;
    case 'show-particles':
      particles.show(effect.preset, effect.position);
      break;
  }
});

stopObservingState();
stopObservingEffects();
```

Effects are delivered immediately during optimistic forward play. If the engine
replays already-seen time, perceptibly identical effects are delivered only once;
effect history remains device-local and is absent from saves.

How reducers and systems *produce* effect descriptors is an A-or-B API decision
covered in [`opinionated.md`](./opinionated.md).

## Optional multiplayer transport

Single-player games need no transport. Multiplayer adds a port while retaining
the same game definition, state, reducer, systems, and `dispatch` call sites.

```ts
const engine = counterGame.createEngine({
  clock: { now: () => performance.now() },
  seed: session.seed,
  timestamp: session.timestamp,
  transport: {
    send(action): void {
      socket.send(JSON.stringify(action));
    },
    subscribe(onEvent): () => void {
      const onMessage = (message: MessageEvent<string>): void => {
        onEvent(JSON.parse(message.data));
      };
      socket.addEventListener('message', onMessage);
      return () => socket.removeEventListener('message', onMessage);
    },
  },
});

engine.dispatch({ type: 'primary-action' });
expect(engine.state.count).toBe(1); // optimistic; no network round trip
```

The authority publishes canonical `timestamp`, `sequence`, and `source` fields.
The client consumes those fields as given; it never derives authority order from
arrival order or its own clock. Confirmation may preserve the visible state,
rebase it, or remove a rejected action.

Networking owns timestamp trust, rollback windows, retained history, incremental
catch-up, state hashes, and subscribe-before-download resynchronization. Those are
protocol concerns rather than concepts every game author must learn.

## Complete single-player wiring

The core can run with only a game definition. Rendering, persistence, and input
are ordinary optional edges.

```ts
const engine = gardenGame.createEngine({ seed: 2026, timestamp: 0 });

const stopRendering = engine.startRendering({
  clock: browserClock,
  renderer: canvasRenderer,
  scheduleFrame: requestAnimationFrame,
});

const stopInput = connectCanvasInput(canvas, (action): void => {
  engine.dispatch(action);
});

await engine.saveTo(indexedDatabaseStore, 'autosave');

// On unmount:
stopInput();
stopRendering();
```

No networking layer, DOM type, storage API, renderer, or real clock is imported
by the game definition itself.

## Behavioral coverage

The examples above intentionally cover behavior through public outcomes. The
remaining API-shape choices and internal contracts are routed as follows:

| BDD suite | Highest-level surface or decision location |
| --- | --- |
| Using deterministic engine math | `deterministicMath`; static restrictions are tooling, not runtime game APIs |
| Creating a world | `createEngine`, read-only `state`, `timestamp`, validation, and opaque saves |
| Spawning entities | ECS A-or-B sections in `opinionated.md` |
| Mutating entity components | ECS A-or-B sections in `opinionated.md` |
| Building a derived component index | layout-independent entity query; coupled internals in `coupled.md` |
| Registering systems | ordered, frozen `systems` configuration |
| Stepping the simulation | `step` and observable system outcomes |
| Advancing to a target tick | `advanceTo` composition and no-backward-time behavior |
| Applying a timestamped event | `dispatch(action, { timestamp })` |
| Ordering game events | canonical `GameEvent` timestamp and sequence |
| Replaying an event log | `createSnapshot` and `replay` |
| Drawing replayable random values | transition-scoped `random` and `randomInteger` context functions |
| Projecting a world for rendering | `startRendering`, `project` alternative, and `renderer.draw` |
| Loading and saving a session record | opaque `save`, `restore`, `saveTo`, and `loadFrom` |
| Compacting a session record | automatic saves or adapter-supplied floor in `opinionated.md` |
| Authorizing a client timestamp | optional network authority policy, absent from the core |
| Retaining authoritative history | automatic network behavior, absent from game definitions |
| Receiving an authoritative event | optional transport and adapter-level `receive` in `coupled.md` |
| Handling optimistic client events | ordinary synchronous `dispatch` plus reconciliation lifecycle choices |
| Incrementally catching up a client | automatic recovery and state-hash verification in the network layer |
| Performing a full resync | automatic `resynchronize`; host-driven phases are isolated in `opinionated.md` |
| Emitting side effects | author effect-production choice plus host `onEffect` |
| Confirming an optimistic side effect | transparent deduplication and key migration; no author API |
| Using a transport adapter | optional `transport` or explicit network wrapper |
| Using engine ports | injected clock, store, transport, renderer, and frame scheduler |
| Serializing input events | plain discriminated-union actions at adapter boundaries |

Snapshot/log layout, the random cursor, derived index representation, rollback
buffers, and effect history are deliberately absent from the author surface; the
rejected coupled forms are documented in `coupled.md`.
