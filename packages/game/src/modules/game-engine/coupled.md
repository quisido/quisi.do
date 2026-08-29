# Implementation-coupled game engine APIs

No implementation-coupled API is currently required for ordinary game authors.
That is the preferred outcome: a game should survive changes to world storage,
random-number generation, indexing, snapshot cadence, reconciliation, and effect
deduplication.

This document records tempting APIs that would couple games to the current design
and the stable boundary to expose instead. Some lower-level forms may still be
appropriate for engine, adapter, and conformance tests, but they should not be
the entrypoint demonstrated to game authors.

## Serialized world layout

Avoid making authors construct engine bookkeeping:

```ts
// Coupled: knows the exact World representation.
const engine = new GameEngine({
  world: {
    entities: {},
    nextEntityId: 0,
    rngCursor: 0,
    seed: 42,
    tick: 0,
  },
});
```

Prefer a stable creation boundary:

```ts
const engine = game.createEngine({ seed: 42, timestamp: 0 });
```

This permits metadata to move, be renamed, or use a different internal
representation without changing game code.

## Random cursor management

Avoid exposing the stateless hash and cursor to reducers:

```ts
// Coupled: an author can forget to persist nextCursor.
const { nextCursor, value } = draw(engine.state.seed, engine.state.rngCursor);
engine.state.rngCursor = nextCursor;
```

Prefer scoped deterministic randomness:

```ts
reduce(state, action, context) {
  return { ...state, value: context.random() };
}
```

The engine remains free to change the PRNG while save-version rules protect old
replays.

## Entity storage and derived indexes

Avoid publishing object keys or index sets:

```ts
// Coupled: depends on numeric string keys and a velocity-specific Set.
for (const entityId of buildIndex(engine.world).velocity) {
  const entity = engine.world.entities[String(entityId)];
}
```

Prefer a layout-independent query:

```ts
for (const entity of world.entities.with('position', 'velocity')) {
  // Entity order and query acceleration are engine guarantees.
}
```

The public behavior is ascending stable entity order and correct component
membership. Whether that comes from a rebuilt `Set`, an incrementally maintained
index, an archetype table, or structure-of-arrays storage is private.

## Tick-loop implementation

Avoid forcing hosts to assemble core loop functions:

```ts
// Coupled: exposes registry execution and the one-millisecond loop algorithm.
world = step({ registry, world });
world = advanceTo({ registry, toTick: 5_000, world });
world = applyEvent({ event, reducer, registry, world });
```

Prefer operations on the configured instance:

```ts
engine.step();
engine.advanceTo(5_000);
engine.dispatch(action, { timestamp: 5_000 });
```

The one-millisecond semantics remain observable and tested without requiring the
registry or intermediate `World` shape to be public.

## Snapshot and log persistence

Avoid requiring stores or games to understand the current event-sourced record:

```ts
// Coupled: freezes snapshot/log field names and compaction representation.
const record: SessionRecord = {
  log: engine.events,
  snapshot: engine.world,
  version: engine.version,
};
```

Prefer an opaque, versioned save:

```ts
const save = engine.save();
await store.save('autosave', save);
const restored = game.restore(await store.load('autosave'));
```

Conformance tests may decode a fixture to prove that resulting state is omitted,
events after the floor replay correctly, and same-version bytes remain stable.
Those assertions do not require the record layout to be a game-author API.

## Compaction internals

Avoid exposing log slicing and snapshot folding:

```ts
// Coupled: callers can create an unreplayable record.
record.snapshot = replay(record.snapshot, eventsThroughFloor);
record.log = record.log.filter((event) => event.timestamp > floorTick);
```

If an advanced adapter must choose a floor, expose one atomic operation:

```ts
const compactedSave = engine.save({ compactThrough: floorTick });
```

The caller may select policy, but only the engine implements compaction. Netcode
window constants remain outside the core.

## Rollback window state

Avoid putting reconciliation constants or buffers on the base engine:

```ts
// Coupled: makes single-player depend on one network protocol.
engine.adjustWindow;
engine.catchupWindow;
engine.pendingByClientSequence;
engine.rollbackToSnapshotFloor();
```

Prefer an optional networking layer with the same high-level engine interface:

```ts
const engine = createNetworkedEngine({
  authorityPolicy,
  engine: game.createEngine({ seed, timestamp }),
  transport,
});
```

Authority and adapter conformance tests still need explicit protocol fixtures for
trust, adjustment, catch-up, boot, late insertion, conflict, and full resync.
Those fixtures belong to `engine-net`, not to game code.

## Resynchronization phases

Avoid asking a game to invoke an ordering-sensitive protocol:

```ts
// Coupled and unsafe if called out of order.
engine.subscribeToLiveEvents();
engine.adoptSnapshot(bundle.snapshot);
engine.replayBundle(bundle.log);
engine.applyBufferedEvents();
```

Prefer one recovery operation plus observable status:

```ts
await engine.resynchronize();
engine.onConnectionStateChange(renderConnectionState);
```

The networking layer can preserve subscribe-then-buffer internally and test each
phase through a dedicated adapter harness.

## Effect-history keys

Avoid exposing played-descriptor sets or provisional tick migration:

```ts
// Coupled: game code now owns rollback deduplication correctness.
engine.sideEffectHistory.get(tick)?.add(JSON.stringify(effect));
engine.migrateEffectKey(provisionalTick, confirmedTick, effect);
```

Prefer effect descriptors at the author boundary and delivery at the host
boundary:

```ts
context.emitEffect({ sound: 'laser', type: 'play-sound' });
engine.onEffect(playEffect);
```

The engine or effects layer owns same-tick structural deduplication, replay
suppression, confirmation migration, and pruning. Effect history never appears in
saved game state.

## Authority sequence allocation

Avoid letting game code assign canonical identity:

```ts
// Coupled and race-prone with multiple sources.
engine.dispatch({ ...action, sequence: engine.lastSequence + 1 });
```

Prefer a transport boundary that sends author actions and receives canonical
events:

```ts
transport.send(action);
transport.subscribe((event) => engine.receive(event));
```

`receive` is necessarily a lower-level adapter API because canonical
`timestamp`, `sequence`, and `source` are part of the protocol. It should not be
used by ordinary reducers, systems, or input handlers. A multiplayer adapter must
prove that exactly one authority assigns globally increasing sequences.

## Platform and I/O dependencies

Avoid importing platform services into authoritative code:

```ts
// Coupled to a browser and nondeterministic during replay.
const now = Date.now();
localStorage.setItem('world', JSON.stringify(state));
canvasContext.drawImage(sprite, x, y);
socket.send(JSON.stringify(action));
```

Prefer injected edges:

```ts
const engine = game.createEngine({ clock, seed, timestamp, transport });
await engine.saveTo(store, 'autosave');
engine.startRendering({ clock, renderer, scheduleFrame });
```

The pure game definition remains usable in a browser, worker, server, test, or
future runtime.

## Development-only contract checks

Finite-number scans, frozen PRNG vectors, native-math lint rules, component-index
rebuild comparisons, state hashes, and cross-runtime replay fixtures are crucial
verification tools. They should be test and diagnostic APIs rather than gameplay
APIs:

```ts
// Acceptable in an engine conformance suite, not in a game.
expectEngineConformance(game, fixtures);
```

This one helper could validate JSON round trips, immutable inputs, integer time,
finite normalized numbers, replay equality, canonical ordering, and lack of
ambient clock/random access while allowing the underlying checks to evolve.

