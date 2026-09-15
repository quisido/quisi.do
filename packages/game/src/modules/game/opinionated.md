# Opinionated game engine API choices

The behaviors in `bdd.md` are requirements; the API shapes below are choices.
Each section presents plausible A-or-B alternatives where the JavaScript and game
engine ecosystems do not provide one decisive standard. The examples use the
same concepts as [`examples.md`](./examples.md), but these choices should be
reviewed before any one spelling becomes public API.

## Factory or constructor

### A — typed game definition, then instances

```ts
const game = createGame({ initialState, reduce, systems, version: 1 });
const engine = game.createEngine({ seed: 42, timestamp: 0 });
```

This gives strong type inference once, keeps configuration separate from session
state, and makes replay/restore naturally belong to `game`.

### B — construct each engine directly

```ts
const engine = new GameEngine({
  initialState,
  reduce,
  seed: 42,
  systems,
  timestamp: 0,
  version: 1,
});
```

This has fewer concepts, but repeats static game configuration for every session
and makes generic inference and versioned restoration less pleasant.

**Leaning:** A. It creates a clear boundary between “the game” and “this running
session.”

## Dispatch, emit, or send

### A — Redux-style action objects

```ts
engine.dispatch({ type: 'primary-action' });
engine.dispatch({ amount: 10, type: 'damage-taken' });
```

`dispatch` plus a discriminated `type` field is familiar to Redux users and
preserves payload type checking. “Emit” remains available as a word for effects.

### B — event-name overload

```ts
engine.emit('primary-action');
engine.emit('damage-taken', { amount: 10 });
```

This is concise and familiar from event emitters, but overloads are harder to
infer, and “emit” can ambiguously mean input, authoritative event, or side effect.

### C — state-machine terminology

```ts
engine.send({ type: 'primary-action' });
```

This is familiar to state-machine users, but may be confused with network I/O.

**Leaning:** A.

## Action metadata shape

### A — action separated from engine metadata

```ts
engine.dispatch(
  { targetId: playerId, type: 'jump' },
  { timestamp: 250 },
);

const event = {
  action: { targetId: playerId, type: 'jump' },
  sequence: 12,
  source: 'player-1',
  timestamp: 250,
};
```

Game actions stay reusable and do not pretend that clients own canonical
metadata.

### B — one flat event object

```ts
engine.dispatch({
  sequence: 12,
  source: 'player-1',
  targetId: playerId,
  timestamp: 250,
  type: 'jump',
});
```

This matches many event logs and avoids nesting, but lets author-controlled
payload keys collide with engine-owned fields.

**Leaning:** A at the author boundary. A transport adapter may flatten the record
on the wire.

## Timestamp source

### A — inject a clock and omit timestamps during normal play

```ts
const engine = game.createEngine({ clock, seed, timestamp });
engine.dispatch({ type: 'jump' });
```

This is convenient in production and easy to test with a manual clock. The core
still never reads a global wall clock.

### B — require time on every dispatch

```ts
engine.dispatch({ type: 'jump' }, { timestamp: 250 });
```

This makes time completely explicit and prevents accidental clock use, but pushes
repetitive plumbing into every input adapter.

**Leaning:** support A as the ordinary path and B as an explicit override for
tests, replays, and authoritative hosts.

## Read-only property or getter method

### A — properties

```ts
engine.state;
engine.timestamp;
engine.version;
```

This is concise and communicates that observation is cheap.

### B — methods

```ts
engine.getState();
engine.getTimestamp();
engine.getVersion();
```

This is familiar from Redux and leaves room for computation, but is noisier and
can imply a mutable object hidden behind an imperative accessor.

**Leaning:** A for immutable snapshots. Use verbs for operations.

## Plain state or ECS-first state

### A — arbitrary game state with optional engine services

```ts
interface State {
  readonly player: {
    readonly position: readonly [number, number];
    readonly velocity: readonly [number, number];
  };
  readonly score: number;
}

const game = createGame<State, Action>({ initialState, reduce, systems });
```

This is immediately readable and works well for small games, but does not provide
the composition and query performance promised by the ECS design.

### B — ECS is the public authoring model

```ts
const player = defineEntity({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
});

const game = createGame({ entities: [player], systems });
```

This exposes the intended composition model and scales to many entities, but asks
counter-game authors to understand entities and components on day one.

### C — custom state plus an ECS namespace

```ts
const game = createGame({
  initialState: () => ({ score: 0 }),
  setup(world) {
    world.entities.spawn({ position: [0, 0], velocity: [0, 0] });
  },
  systems,
});
```

This preserves a gentle entrypoint while making entities a first-class optional
facility, at the cost of two state models.

**Leaning:** C if both models can be saved and replayed as one immutable value;
otherwise B is more coherent with the design.

## Entity creation result

### A — return a stable handle

```ts
const player = world.entities.spawn({
  position: [0, 0],
  velocity: [0, 0],
});

world.entities.set(player, 'velocity', [1, 0]);
```

This is familiar from ECS libraries and hides numeric identifiers.

### B — return the next world and numeric identifier

```ts
const { entityId, world: nextWorld } = spawnEntity(world, {
  position: [0, 0],
  velocity: [0, 0],
});
```

This makes immutability explicit and is easy to test as a pure function, but is
verbose and exposes identifier allocation to ordinary game code.

**Leaning:** A in reducer/system context, backed by an immutable command buffer;
B is a useful lower-level functional API.

## Component mutation

### A — named entity operations

```ts
world.entities.set(player, 'velocity', [1, 0]);
world.entities.remove(player, 'acceleration');
```

This is compact and gives the engine one mutation path.

### B — immutable entity update callback

```ts
world.entities.update(player, (entity) => ({
  ...entity,
  velocity: [1, 0],
}));
```

This is flexible and familiar from immutable state libraries, but can make it
easier to bypass component validation and derived membership rules.

**Leaning:** A for component operations; reserve a general callback for custom
state outside the ECS.

## Component queries

### A — iterable query

```ts
for (const entity of world.entities.with('position', 'velocity')) {
  entity.set('position', add(entity.position, entity.velocity));
}
```

The required component values are type-narrowed and entities can be yielded in
ascending identifier order. Storage layout and the derived index remain hidden.

### B — callback query

```ts
world.entities.forEach(
  ['position', 'velocity'],
  ({ position, velocity }, entity) => {
    entity.set('position', add(position, velocity));
  },
);
```

This lets the engine control iteration and deferred writes, but callback nesting
is less approachable and control flow such as `break` is awkward.

**Leaning:** A, provided writes are safely staged until iteration completes.

## System transition style

### A — return the next immutable state

```ts
const move: System<State> = (state) => ({
  ...state,
  position: state.position + state.velocity,
});
```

This is the clearest pure-function contract and works well for small state.

### B — issue commands through a scoped world

```ts
const move = defineSystem(['position', 'velocity'], (entity, world) => {
  world.set(entity, 'position', add(entity.position, entity.velocity));
});
```

This is conventional for ECS engines and can batch immutable updates efficiently,
but the scoped object must not become a mutable escape hatch.

**Leaning:** support B for ECS systems and specify that commands commit as one
immutable transition. Retain A for reducers and simple games.

## Random value consumption

### A — context function

```ts
reduce(state, action, context) {
  return { ...state, value: context.random() };
}
```

This is approachable and makes the valid call site obvious.

### B — explicit state threading

```ts
const { random, state: nextState } = drawRandom(state);
return { state: { ...nextState, value: random } };
```

This makes cursor advancement impossible to hide, but exposes replay machinery
and is easy for junior authors to misuse.

**Leaning:** A. The context should be valid only during a transition and should
persist each consumed draw automatically.

For bounded integers, prefer a dedicated `randomInteger({ minimum, maximum })`
operation over asking authors to round a float. That keeps range semantics and
the deterministic rounding implementation in one place.

## Deterministic math naming

### A — descriptive named exports

```ts
import { cosineOf, sineOf } from '@quisido/game-engine';

const x = sineOf(angle);
```

This follows the repository's verb-oriented naming and makes accidental native
math imports conspicuous.

### B — a math namespace matching JavaScript

```ts
import { deterministicMath } from '@quisido/game-engine';

const x = deterministicMath.sin(angle);
```

This is easiest to migrate from `Math`, groups a growing function family, and
makes the deterministic implementation explicit at each call site.

**Leaning:** B for discoverability and migration familiarity, unless repository
naming consistency is valued more highly.

## Effect production

### A — transition result

```ts
return {
  effects: [{ sound: 'laser', type: 'play-sound' }],
  state: { ...state, shots: state.shots + 1 },
};
```

Effects are explicit data and reducers stay free of callbacks. Every reducer now
has a more complicated return type.

### B — transition context

```ts
context.emitEffect({ sound: 'laser', type: 'play-sound' });
return { ...state, shots: state.shots + 1 };
```

State transitions stay concise, but the reducer is no longer a mathematically
pure function unless the context is understood as a command collector.

### C — derive effects from state changes

```ts
engine.onStateChange((state, previousState) => {
  if (state.shots > previousState.shots) playLaser();
});
```

This requires no effect API in game logic, but cannot naturally describe every
effect and risks duplicating domain logic in observers.

**Leaning:** A for explicit effects, plus C for genuinely presentational effects.

## Render loop ownership

### A — engine-managed loop

```ts
const stop = engine.startRendering({ clock, renderer, scheduleFrame });
```

This is easy to start and lets the engine enforce projection rules.

### B — host-managed loop

```ts
const draw = (now: number): void => {
  renderer.draw(engine.project(now));
  requestAnimationFrame(draw);
};
requestAnimationFrame(draw);
```

This composes with an application's existing animation loop and makes ownership
obvious, but requires every host to wire the same projection pattern correctly.

**Leaning:** provide B as the primitive and A as a convenience adapter.

## Persistence ownership

### A — opaque save owned by the engine

```ts
const save = engine.save();
const restored = game.restore(save);
```

This keeps snapshots, logs, and migrations private and is easiest for authors.

### B — explicit session record

```ts
const record = engine.exportSession();
const restored = game.importSession(record);
```

This makes server persistence and diagnostics easier, but exposes event-sourcing
structure as public API.

**Leaning:** A for games. Provide B only to adapter authors if opaque saves prove
insufficient.

## Compaction policy

### A — compact automatically while saving

```ts
await engine.saveTo(store, 'autosave');
```

The engine uses a configured single-player retention policy. Authors do not need
to understand replay floors.

### B — caller supplies a game-time floor

```ts
const save = engine.save({ compactThrough: engine.timestamp - 30_000 });
```

This exposes the mechanism needed by network authority without importing any
netcode constant into the core. It is precise but easy to misuse.

**Leaning:** A for game authors; B for authority and storage adapters. Never put
`ADJUST_WINDOW` in the core API.

## Networking composition

### A — optional transport on the engine

```ts
const engine = game.createEngine({ clock, seed, timestamp, transport });
```

Call sites remain identical between single-player and multiplayer.

### B — explicit reconciliation layer

```ts
const localEngine = game.createEngine({ seed, timestamp });
const engine = createNetworkedEngine({ clock, engine: localEngine, transport });
```

The dependency direction is unmistakable: networking depends on the pure engine,
and single-player omits it. The wrapper may make types and lifecycle more complex.

**Leaning:** B internally. It may expose the same narrow `Engine` interface so
game call sites do not care which implementation they received.

## Optimistic acknowledgement

### A — dispatch returns a receipt

```ts
const receipt = engine.dispatch({ type: 'jump' });
receipt.status; // 'pending'
await receipt.confirmed;
```

This is convenient for user-interface feedback, but encourages game logic to wait
for authority and raises awkward questions for offline engines.

### B — dispatch is synchronous; lifecycle is observable

```ts
engine.dispatch({ type: 'jump' });
engine.onReconciliation(({ clientSequence, status }) => {
  showConnectionStatus(clientSequence, status);
});
```

This protects immediate simulation and supports batched/out-of-order
acknowledgements, but correlating one action takes more work.

**Leaning:** B for simulation. A receipt can be a UI-only convenience that must
never delay optimistic state or effects.

## Catch-up and full resynchronization visibility

### A — automatic recovery

```ts
const engine = createNetworkedEngine({ engine: localEngine, transport });
engine.onConnectionStateChange(renderConnectionState);
```

The layer chooses incremental catch-up or full resync and verifies state hashes.
Games observe status but cannot perform the protocol incorrectly.

### B — host-driven protocol

```ts
await engine.subscribe();
const bundle = await transport.downloadSnapshot();
engine.adoptSnapshot(bundle.snapshot);
engine.applyBuffered(bundle.events);
```

This is flexible for server and adapter tests, but exposes ordering-sensitive
steps that are dangerous in ordinary game code.

**Leaning:** A publicly. B belongs on a narrow adapter/test harness surface.

## Invalid input handling

### A — throw immediately

```ts
expect(() => engine.advanceTo(1.5)).toThrow(/integer/i);
expect(() => engine.dispatch(rawPointerEvent)).toThrow(/serializable/i);
```

This is idiomatic for programmer errors and keeps invalid state from crossing a
transition boundary.

### B — return a result

```ts
const result = engine.dispatch(action);
if (!result.ok) report(result.error);
```

This is useful when rejection is expected domain behavior, such as remote
authority rejecting an out-of-window action, but adds noise to local calls.

**Leaning:** throw for local contract violations; model authority rejection as a
network lifecycle event rather than a synchronous dispatch result.
