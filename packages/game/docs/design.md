# Deterministic, Replayable Game Engine — Design Spec

**Date:** 2026-06-07 (revised 2026-06-08 after adversarial review)
**Status:** Design approved; awaiting implementation plans. First runbook written:
`docs/superpowers/plans/2026-06-07-deterministic-engine-core-runbook.md`.
**Scope:** Full vision (local engine + server persistence + multiplayer rollback)
captured as a forward-looking design. Implementation proceeds as a series of
small, individually-planned increments — **not** one plan.

**Revision note (2026-06-08).** An adversarial review corrected several defects:
the four windows are now **two horizons** (`ADJUST` rollback/snapshot floor vs
`CATCHUP` log retention) — the earlier "one constant bounds everything forever"
claim was false; the determinism contract now bans **non-finite/`-0`** state and
correctly scopes the float guarantee to ECMAScript's per-operator rounding;
compaction takes the floor as a **parameter** so no netcode constant leaks into
`engine`; the side-effect dedup now **migrates** keys on tick-shift to avoid a
guaranteed double-fire; ordering authority and the adapter `seq`-assignment
obligation are made explicit; `Event` is renamed `GameEvent` (DOM-global clash).
The `C3` "floats are inherently non-deterministic" critique was **rejected**: JS
mandates separately-rounded IEEE-754 results for `+ − × ÷ sqrt` (no FMA/x87), so
doubles are safe under the restricted op set — fixed-point is not required.

---

## 1. Purpose & guiding principle

A 2D `<canvas>` game engine for `packages/game/` whose state is an immutable,
Redux-style value that responds only to timestamped events, and whose motion
(position/velocity/acceleration, collisions, spawns) is computed by integrating
over time between events rather than by mutating every rendered frame.

The same state model lives on the **client** (immediate, optimistic rendering)
and on an authoritative **server** (source of truth for save states, cross-device
sync, and multiplayer). Replayability is the load-bearing property:

> **The engine is a pure, environment-agnostic library — the same JavaScript
> bundle on client and server. Given a starting snapshot and an ordered event
> log, it always computes the same state: `replay(snapshot, events) → state`.
> All nondeterminism (wall clocks, ping, race resolution, validation, trust) is
> resolved once by whichever backend is the authority, and baked into each
> event record (`seq`, canonical `timestamp`, accepted/rejected). The client is
> a pure replayer; the server is a funnel. Multiplayer is single-player plus a
> reconciliation layer (`engine-net`); single-player can run with a loopback
> authority (rollback/resync branches never fire) or omit that layer entirely.**

Everything below is downstream of that sentence.

### Non-goals (this spec)
- No Durable Object / concrete server implementation. The engine exposes the
  *ports* a server needs; the backend is chosen per project later.
- No form-element input (input/button DOM events). Canvas input only: touch,
  pointer, click, drag, keyboard, gamepad.
- The high-performance dirty-rectangle renderer is **conceptually supported**
  (see §10) but specified and built in a separate deep-dive.

---

## 2. The determinism contract

Rules every **system** (see §3) MUST obey. Enforced by lint where possible;
violations are the only way two machines desync.

1. **Time is integer milliseconds.** The integrator advances exactly `+1ms` per
   step. `MS_PER_TICK = 1` is a named constant (the knob exists; the value is 1).
   A gap of N ms is N identical steps. This makes collision detection robust at
   ordinary speeds — but note it **reduces, not eliminates, tunneling**: an
   entity moving faster than a collider's width per millisecond can still skip
   past it in one step. Systems that allow very high speeds must do swept/
   continuous collision against the per-step displacement, not point overlap.
2. **Math is restricted, and operands stay finite.** Systems may use only
   `+ − × ÷` and `sqrt` on numbers. Per the ECMAScript spec these five operations
   each produce a *separately, correctly rounded* IEEE-754 binary64 result —
   there is no FMA contraction or x87 extended precision in JS — so they are
   bit-identical across compliant engines (V8/JSC/SpiderMonkey). What is **not**
   guaranteed correctly-rounded is the transcendental family
   `sin/cos/tan/asin/acos/atan/atan2/exp/log/pow (**)/hypot/cbrt`; these are
   **banned** in systems and routed through `engine/math` (bit-identical custom
   implementations). Additionally, **state must contain only finite, normalized
   numbers**: no `NaN`, no `±Infinity`, no `-0`. `÷` by zero, overflow, and
   `sqrt` of a negative are bugs — guard against them, because `JSON` serializes
   `NaN`/`Infinity` to `null` and `-0` to `0`, so a cold-loaded server would
   silently disagree with a hot client. Enforced via ESLint `no-restricted-globals`
   / `no-restricted-properties` / `no-restricted-syntax` (for the `**` operator,
   which the property rules cannot catch); the lint is a tripwire, the
   replay-equality tests are the real backstop.
3. **Iteration order is deterministic.** Entities are always iterated by stable
   integer id ascending — never `Set`/`Map`/object-key insertion order. When two
   collisions resolve in the same tick, id order decides, identically everywhere.
4. **No ambient state in the engine.** No `Date.now()`, no `Math.random()`, no
   I/O inside `step`/`advanceTo`/`applyEvent`/`replay`. Time enters only as event
   timestamps; randomness only via the seeded PRNG whose cursor is part of state.
   The PRNG is a **stateless integer hash** `draw(seed, cursor) → [value,
   nextCursor]` using only `Math.imul`/`^`/`>>>` (so it is addressable at any
   cursor for replay and never loses integer precision as `cursor` grows); its
   single float step is the final divide into `[0, 1)`, which is correctly
   rounded and therefore bit-stable.

> Naming follows `AGENTS.md`: `ALL_CAPS` constants, `PascalCase` types,
> `camelCase` functions, verbs for functions/systems (`moveEntities`,
> `detectCollisions`), `on<Event>` for handlers, `#private` members.

---

## 3. Serializable state & the ECS data model

The entire world is one JSON-serializable object (extends the existing
`StringifiableRecord`). Nothing in it is a function, class instance, `Map`, or
`Set`.

```
World (serializable)
├── tick: number              // absolute ms since genesis; the sim clock
├── seed: number              // PRNG seed (immutable, from genesis)
├── rngCursor: number         // count of random draws consumed — advances as state
├── nextEntityId: number      // monotonic; gives deterministic creation order
└── entities: {               // keyed by stringified integer id
      [id: string]: {
        components: {
          position?: readonly [number, number]
          velocity?: readonly [number, number]
          acceleration?: readonly [number, number]
          collider?: { readonly width: number; readonly height: number }
          spawner?: { readonly intervalMs: number; readonly lastSpawnTick: number }
          // …open set, all plain data
        }
      }
    }
```

**ECS split.** Components are pure data; **systems are code in a registry**,
registered once at startup, never serialized. A system queries entities by which
components they carry and returns a new `World`. The bullet/turret/homing-missile
cases compose from components (`{position,velocity,collider}`,
`{position,spawner}`, all four) without inventing combined types.

- `nextEntityId` gives stable creation order (contract rule #3). A bullet spawned
  2,000 ticks into a replay receives the same id on every machine.
- `rngCursor` makes randomness replayable (rule #4): `draw(seed, cursor) →
  [value, nextCursor]` is pure; a system reading randomness writes the advanced
  cursor back into state. Same log → same "random" angle everywhere.
- **Dormant = data, not bookkeeping.** A collided entity simply has zeroed/absent
  `velocity`; the movement query stops matching it. No callbacks to remove.

**Layout decision (v1):** nested "array-of-structures" (components under each
entity) over "structure-of-arrays". Simpler, deterministic, sufficient for
hundreds—not millions—of entities. The system **query API hides the layout**, so
a later switch needs no game-code changes.

### Derived component index (performance, replay-safe)

Iterating *all* entities every tick to find the moving ones is the cost to avoid.
Instead the engine maintains, per component type, a `Set<number>` of entity ids
("archetype" / cached query).

**The membership predicate is explicit and shared.** Each index is defined by a
pure predicate over an entity's components — for the velocity index, "has a
`velocity` component whose value is non-zero." This single predicate is the
*only* definition of membership, and **both** the cold-load full-scan rebuild
**and** any incremental maintenance must use byte-identically the same predicate.
That is what makes "build equals rebuild" hold: `buildIndex(world)` is the
reference, and an incremental implementation is correct iff, after every
mutation, it equals `buildIndex` of the resulting world.

- The index is **NOT serialized**. It is a pure function of `world.entities`,
  rebuilt by scanning state once on load. A server cold-loading a snapshot
  reconstructs the identical index → replay holds.
- Systems iterate `index` **sorted ascending** for deterministic order.

**Membership tracks component *value*, not just presence.** Because the velocity
predicate is "present *and* non-zero," `detectCollisions` zeroing a velocity
removes the entity from the moving set — that is the intended "dormant = data"
behavior. The discipline is therefore: **all component writes go through one
mutation API** (`setComponent`/`removeComponent`/`spawnEntity`) that recomputes
the affected index membership from the new value. Systems never reach into
`world.entities` to mutate a component directly; a write that bypasses the API
leaves a stale index, which silently desyncs. (For v1 the index is simply rebuilt
via `buildIndex` each tick — trivially correct; incremental maintenance is a
later optimization that must preserve the "equals `buildIndex`" invariant, which
is itself a test.)

---

## 4. The tick loop, integration & emergent transitions

Two clocks, cleanly separated.

```
RENDER loop (client only, ~60fps, NON-deterministic, never mutates authoritative state):
  on each requestAnimationFrame:
    targetTick = lastConfirmedTick + (clock.now() − lastConfirmedWallClock)  // optimistic projection
    projected  = advanceTo(authoritativeWorld, targetTick)                   // pure, THROWAWAY
    draw(projected)

SIM (deterministic, identical on client & server):
  advanceTo(world, toTick):
    while (world.tick < toTick): world = step(world)   // exactly +1ms each
    return world

  step(world):                       // one 1ms tick — registered systems in FIXED order
    world = runSpawners(world)        // may spawn entities (uses PRNG via rngCursor)
    world = moveEntities(world)       // position += velocity; velocity += acceleration (index only)
    world = detectCollisions(world)   // may zero velocity / despawn (index only)
    return { ...world, tick: world.tick + 1 }   // immutable — returns a NEW World

  applyEvent(world, event):           // event = { seq, timestamp(ms), source, type, payload }
    if (event.timestamp < world.tick) throw      // determinism guard: never integrate backwards
    world = advanceTo(world, event.timestamp)    // integrate up to the event's moment
    world = reducer(world, event)                // THEN apply the discrete input
    return world

  replay(snapshot, events):           // events ordered by (timestamp, seq) — see §5
    world = snapshot
    for (const event of events): world = applyEvent(world, event)
    return world
```

- **System execution order is part of the contract** — declared once at
  registration, frozen, identical everywhere. Reordering changes results.
- **Emergent transitions are recomputed, never stored.** The collision that
  zeroes a velocity at tick 2000 is discovered inside `step`, not stored as a
  `{type:'collision'}` event. `step` is pure, so replay rederives it. The log
  holds only discrete *inputs*; collisions/clamps/timer-fires are punctuation
  found *inside* integration.
- **Optimistic projection is throwaway.** The render loop reads `clock.now()` and
  projects forward for smooth display, but that projection is never written back
  into authoritative state. The *engine* never reads a clock (rule #4); only the
  *render adapter* does.

**Performance note.** Live play integrates only ~16ms per frame × active entities.
Bulk 1ms looping happens only during catch-up (backgrounded tab returning, or
server replaying a gap) — a tight synchronous loop (100 active × 10,000 ms ≈ 1M
simple ops, single-digit ms). The derived index ensures dormant entities cost
nothing.

---

## 5. Persistence, validity windows & rollback

### Persisted unit

```
SessionRecord (serializable)
├── version: number              // engine/physics code version (see §7)
├── snapshot: World              // full state at snapshot.tick — the REPLAY FLOOR
└── log: readonly GameEvent[]    // events with timestamp > snapshot.tick
                                 // GameEvent = { seq, timestamp, source, type, payload }
```

- `GameEvent` (not `Event` — `Event` is a DOM global). Inclusion in `log` is
  gated by `timestamp` (the canonical game-time field), not a separate `tick`.
- `resultingState` is **not** stored per event (memory). Only the floor snapshot
  holds a full `World`; everything after is replayed. Door left open to cache
  per-event `resultingState` + a state hash later (purely additive) for desync
  detection.

### Canonical ordering — ordered by `(timestamp, seq)`, NOT by `seq`

`seq` is server **receive** order; `timestamp` is canonical **game** time.
Because the trust window (below) can accept a client's *claimed* time, a
later-arriving event (higher `seq`) may carry an *earlier* `timestamp`. Replaying
in `seq` order would make `applyEvent` call `advanceTo` *backwards* — impossible.
Therefore:

- **The canonical log is sorted by `(timestamp, seq)`.**
- `seq` is the tiebreak for identical timestamps and the dedup/identity key.
- "Receive-order wins ties" applies *only* when two events share the exact same
  ms — materialized by the server into `seq` and broadcast, never re-derived by
  clients.

### The four windows

Ordered shortest → largest. Exact constants TBD from observed p90/p99 ping &
download; the *shape* is fixed.

1. **`TRUST_WINDOW`** — `|serverNow − claimed| ≤ this` → accept the client's
   timestamp as canonical (fast path, best responsiveness, usually no rollback).
2. **`ADJUST_WINDOW`** — beyond trust, within this → accept the event but
   overwrite `timestamp = serverNow − estimatedPing` (anti-cheat; causes a small
   client rollback). **This is the max event-lateness = max rollback depth = the
   `snapshot` floor horizon.** `estimatedPing` is the authority's own measurement
   per connection (e.g. half the round-trip of a periodic heartbeat / ack), never
   a client-supplied value — otherwise the overwrite re-opens the trust hole it
   exists to close. Note the estimator is itself an anti-cheat surface: a client
   that selectively delays heartbeat acks while sending game events promptly can
   inflate the server's ping estimate; the estimator must resist this (e.g. cap
   or use a robust minimum, not a gameable mean). Exact estimator TBD.
3. **`CATCHUP_WINDOW`** — the **event-log retention** horizon, `≥ ADJUST_WINDOW`.
   It reaches back to the oldest connected client's last sync so that client can
   *incrementally* replay its own local state + missed events. State hash
   confirms success. **This is a different, larger horizon than the snapshot
   floor** — see the corrected compaction rule below.
4. **`BOOT_WINDOW`** (largest) — hard cap on #3. A client silent longer than this
   is booted and must full-resync (§6). Bounds server memory; anti-abuse lever.

> Beyond `ADJUST_WINDOW` an event is **rejected** — "it never happened." This is
> the deliberate trade from the brainstorm: losing an out-of-window event is
> better than rewinding deep history.

### Compaction (bounding the infinite game) — two horizons, not one

An earlier draft of this spec wrongly claimed `ADJUST_WINDOW` was simultaneously
the rollback depth, the snapshot floor, **and** the log-retention horizon, and
that "replay is bounded to one window forever." That is false whenever
`CATCHUP_WINDOW > ADJUST_WINDOW` (the normal case). The corrected model keeps the
**snapshot** and the **log** on two separate horizons:

- **`snapshot`** advances to `serverNow − ADJUST_WINDOW`: no accepted event can
  legally land before that (window 2 rejects older ones), so the snapshot is a
  safe rollback floor. **Safety invariant:** acceptance and compaction must read
  the *same* `serverNow` per pass, and the newest possible accepted timestamp
  (`serverNow − estimatedPing`) must be strictly `≥` the floor
  (`serverNow − ADJUST_WINDOW`); i.e. `estimatedPing < ADJUST_WINDOW` must hold by
  construction, or the event is routed to reject. This closes the gap where a
  freshly-accepted event could land at/below a just-advanced floor.
- **`log`** retains events back to `serverNow − CATCHUP_WINDOW` (≥ the snapshot
  floor) so a returning client within that window can catch up incrementally.
  These retained events *predate the snapshot floor* — that is intended; they are
  kept for catch-up, not for rollback.
- **Rollback** only ever rewinds to the `snapshot` floor (one `ADJUST_WINDOW`), so
  rollback cost stays bounded even though the log is longer.

So: rollback cost is bounded by `ADJUST_WINDOW`; server log memory is bounded by
`CATCHUP_WINDOW` (capped by `BOOT_WINDOW`). Two knobs, two costs — not one.

### Rollback / reconciliation

```
onAuthoritativeEvent(event):            // from authority; carries canonical seq + timestamp
  if (event.timestamp < latestAppliedTimestamp):   // a late event belongs in the past
     insert into log at its (timestamp, seq) position
     world = replay(snapshot, log.filter(e => e.timestamp >= snapshot.tick))
                                                    // rewind to floor, replay only post-floor events
  else:
     world = applyEvent(world, event)              // common case: extend
  reconcile pending optimistic events
```

`replay` only ever consumes the **post-floor** slice of the log (events with
`timestamp ≥ snapshot.tick`); the older retained events exist solely for a
returning client's incremental catch-up (§6), not for rollback. Because the floor
is never older than `ADJUST_WINDOW`, worst-case rewind is one window — never
"replay all history."

**Ordering authority (who decides `(timestamp, seq)`).** The authority assigns
both the canonical `timestamp` (after the trust/adjust decision) and a globally
monotonic `seq`, then **broadcasts both**. Clients sort by `(timestamp, seq)`
using the authority's assigned values; they **never re-derive** ordering from
their own clocks or receive order. This is what keeps two simultaneously-adjusted
events (which can invert relative to their `seq`) from being ordered differently
on different machines: there is exactly one published order. The single-threaded
serialization point (the Durable Object, deferred) is what makes `seq` globally
monotonic; the `Loopback`/`ServiceWorker` adapters must provide an equivalent
single assignment point (see §9 note).

### Optimistic events are provisional until acked

```
client emits → applied locally immediately (optimistic) AND sent via transport
             → held in pendingByClientSeq buffer
server acks {seq, timestamp}
             → canonical == optimistic: nothing visible changes
             → differs (adjust path) or interleaved: rewind+replay corrects it
server rejects → drop from optimistic log, rewind+replay without it
```

---

## 6. Full resync (beyond the window) — subscribe-then-buffer

Incremental catch-up (within `CATCHUP_WINDOW`) replays from the client's own
state. When a client is beyond it, desynced (hash mismatch), or freshly joining,
it must adopt the server snapshot wholesale. To avoid being stale the instant the
(possibly large) snapshot finishes downloading:

1. **Subscribe to the live event stream FIRST.**
2. Request the bundle `{ snapshot@floor + log up to send-time T }`.
3. While downloading, **buffer** live events arriving after T.
4. On completion: `adoptSnapshot(snapshot)`, replay bundle log, then
   `applyBuffered(events)` from T forward.

No download-time guessing; works for any duration (the Redis-PSYNC /
compaction-consumer pattern). The resync snapshot is the rollback floor
(`ADJUST_WINDOW` old) in v1; a fresher resync snapshot is a later optimization.

The engine ports must expose `adoptSnapshot(snapshot)` and
`applyBuffered(events)` so a deferred server can drive this.

---

## 7. Side effects (audio, particles, network) — optimistic, tick-keyed dedup

Effects fire **optimistically**, never waiting on the network — pressing fire
must *bang* without a round-trip; a collision after 3s of passive travel needs no
server validation. To survive rewind+replay without double-firing:

- An effect is a **descriptor emitted on a tick**. Dedup store
  `sideEffectHistory: tick → Set<descriptor>` (NOT serialized — it is "what this
  device's speaker already did", not game truth; pruned with the compaction floor).
- **Emit rule:** `if (!sideEffectHistory.get(tick).has(descriptor)) emit(descriptor)`.
- **Fast path:** during normal forward play every tick is new — skip the check;
  consult the history only when replaying ticks ≤ the highest already simulated.

**The descriptor encodes everything perceptible** (sound id, volume, stereo pan,
position, log string). Consequence:

- Two perceptibly-different effects on the same tick → different descriptors →
  both fire (e.g. positional "object 1" vs "object 2").
- Two byte-identical descriptors on the same ms → deduped, which is *correct*:
  two perfectly simultaneous identical sounds are indistinguishable from one.
- `entityId` is therefore **not** a key dimension; where it matters perceptually
  (positional audio) the entity's position is already in the descriptor.
  Over-keying would cause a double-play on rollback that the tick-key suppresses.

Effects need not originate from a system — collision is a *system*, the clink is
an *effect*; an effect is just "something emitted a descriptor on this tick"
(system-requested or observer-derived from a state diff). The engine provides
only the tick-keyed dedup.

**The tick-shift double-fire, and how the key avoids it.** A subtle case the
tick-only key must handle: an effect emitted optimistically at *predicted* tick
`T` whose canonical tick, after adjustment, becomes `T' ≠ T`. If the played-set
were keyed purely on the absolute tick, the confirmed replay would check
`sideEffectHistory.get(T')`, miss (only `T` is recorded), and **fire again** — a
*guaranteed* double on every adjusted effect, not a rare one. To prevent this,
an optimistically-emitted effect records its **provisional key**, and when the
authority confirms the canonical tick the played-set entry is **migrated**
`T → T'` (re-keyed, not re-emitted). Dedup is therefore keyed on the *originating
tick as currently known*, migrated on confirmation — so a pure tick-shift does
not double-fire.

**Accepted limitation (narrowed).** What we still **live with** is only the case
where an inserted past event genuinely *changes the simulation outcome* such that
a *different* effect should have played (the entity re-appears and re-collides;
the user expects a sound). That requires landing in the adjust window AND altering
another action's effects — rare. We do **not** accept routine double-fires from
tick-shift (the migration above handles those). Implementers MUST NOT "fix" the
remaining limitation by adding input latency.

---

## 8. Versioning, security & determinism hazards

- **`SessionRecord.version`.** A snapshot is replayable only by the same
  physics/system code that produced it. Changing a system can silently corrupt
  saves and desync a v1 client against a v2 server. v1 policy: **reject on
  mismatch**; migration tooling deferred.
- **Client timestamp is a trust surface.** Determinism holds regardless (everyone
  agrees on the log), but fairness does not — the two-window trust/adjust scheme
  (§5) is the anti-cheat boundary. The server is sole authority over canonical
  `timestamp` + `seq`.
- **Transcendental ban (rule #2)** is the most likely silent desync; lint-enforce
  from day one rather than excising later. The lint is only a tripwire (it cannot
  catch aliased access like `const { sin } = Math`); replay-equality tests are the
  authoritative check.
- **Non-finite / `-0` state** (rule #2) is a quieter desync: `JSON` maps
  `NaN`/`Infinity → null` and `-0 → 0`, so any such value in state makes a
  cold-loaded server disagree with a hot client and breaks state-hash comparison.
  Guard against `÷`-by-zero / overflow / `sqrt` of negatives at the system level;
  consider a debug-build assertion that scans state for non-finite numbers after
  each `step`.
- **Rollback "butterfly".** A single late event can legitimately relocate many
  entities (re-run PRNG + physics). Determinism is preserved; the **render** layer
  needs interpolation/smoothing so corrections don't visibly teleport (render
  concern, not sim).

---

## 9. Ports & adapters (hexagonal)

The engine declares interfaces it needs but never implements:

```
Transport  — emit(event): void ; onAuthoritative(cb): void
             // how an emitted event reaches the authority and how the
             // authoritative log comes back
Store      — load(): SessionRecord ; save(record): void
Clock      — now(): ms                      // injected; never Date.now() in engine
Renderer   — draw(world): void              // canvas drawing (see §10)
```

Adapters (chosen per project, outside the engine):

- **`LoopbackTransport`** — lets a single-player game opt into the `engine-net`
  layer by authorizing instantly and assigning `seq` locally; the rollback/resync
  branches simply never fire. (A single-player game may also skip `engine-net`
  and this adapter entirely — see §11.)
- **`LocalStorageStore` / `FileStore`** — single-player persistence (no server).
- **`ServiceWorkerTransport`** — makes emit→authorize asynchronous even offline,
  so the engine is exercised in its true async shape and is better battle-tested
  for online play.
- **`DurableObjectTransport` / `DurableObjectStore`** — deferred; not in any spec
  yet. The DO is the natural single-threaded serialization point that assigns
  monotonic `seq` and orders racing events race-free.

> **Adapter obligation — total `(timestamp, seq)` order.** §5 ordering only works
> if some single point assigns a globally monotonic `seq`. The Durable Object
> provides this naturally but is deferred. Therefore **every multi-source adapter
> must document how it guarantees a single `seq` assignment point.** Loopback is
> trivially fine (one process, one source). `ServiceWorkerTransport` is also fine
> as long as the worker is the sole authority for its session. An adapter that
> cannot guarantee a single assignment point cannot support multiplayer — state
> that limitation explicitly rather than shipping a silent race.

---

## 10. Rendering (conceptual support; deep-dive deferred)

The engine's render contract is `Renderer.draw(world)` invoked by the rAF loop on
the optimistically-projected (throwaway) world. The spec must not preclude a
**dirty-rectangle / incremental 60fps renderer** that redraws only changed
regions rather than every pixel. This is supported conceptually because:

- The renderer receives full `World` snapshots and may diff consecutive projected
  worlds to compute changed regions itself.
- Nothing in the sim assumes full-frame redraw; render is fully decoupled from
  `step`.

The concrete dirty-rect strategy (layer/region tracking, the existing
reconciler's role) is a separate prompt/spec.

---

## 11. Repository structure (directories now, packages later)

It is **too early to split packages**. The concern boundaries below live as
**directories within `packages/game/`**, structured so each can be promoted to
its own package once stable. The existing `tiny-chao-garden` / `pikachus-beach` /
`quisido-store` / reconciler code are **proofs-of-concept** and need not survive;
this spec is not coupled to them and is more thoroughly vetted than they are.

Proposed concern directories (extractable later):

- `engine/` — pure single-node core: ECS (components, systems, derived index,
  mutation API), tick loop (`step`/`advanceTo`/`applyEvent`/`replay`), PRNG,
  `engine/math`, **`SessionRecord` (snapshot+log) + the compaction *mechanism***,
  and save/load via the `Store` port. Zero DOM, zero Cloudflare, zero
  `Date.now()`, **zero network concepts**. A complete single-player engine on its
  own. Crucially, `compact(record, floorTick)` takes the floor as a **caller-
  supplied parameter** — `engine` knows *how* to fold events into the snapshot up
  to a given tick, but not *which* tick. It never references `ADJUST_WINDOW`. A
  single-player game compacts with whatever floor it likes (e.g. "keep last 1000
  events" or never); a networked game passes `serverNow − ADJUST_WINDOW`. This is
  what keeps the boundary clean: the *netcode constant* lives in `engine-net`; the
  *mechanism* lives in `engine`.
- `engine-net/` — everything that exists *only* because events arrive from
  multiple sources asynchronously and a remote authority must be reconciled: the
  four validity windows, the rollback *trigger* + optimistic pending buffer, and
  resync (subscribe-then-buffer). **Owns `ADJUST_WINDOW`** and decides the floor
  tick it passes to `engine`'s `compact`. **Depends on `engine`; `engine` never
  imports it.** A single-player game omits this layer entirely (and compacts with
  its own simple policy, or not at all); a multiplayer game adds it. (Single-
  player *may* optionally include it with a loopback authority, in which case the
  rollback/resync branches never fire.)
- `effects/` — tick-keyed side-effect dedup + emission.
- `adapters/` — `LoopbackTransport`, `LocalStorageStore`, `FileStore`,
  `ServiceWorkerTransport`, the canvas `Renderer`.
- `games/` — actual games wiring the above.

---

## 12. Open items for implementation plans

Each becomes its own plan → review → build increment (human- or agent-executed):

1. `engine/math` — bit-identical `sin/cos/tan/atan2/hypot/pow/exp/log` + the
   ESLint ban rule (`no-restricted-properties` + `no-restricted-syntax` for `**`).
   **(Implemented by the first runbook: `2026-06-07-deterministic-engine-core-runbook.md`.)**
2. ECS core — `World` types, `spawnEntity`/`setComponent`, derived index (with the
   explicit shared membership predicate), system registry with frozen execution
   order. **(First runbook.)**
3. Tick loop — `step`/`advanceTo`/`applyEvent` (with the `timestamp ≥ tick`
   guard)/`replay` + replay-equality tests (the determinism proof: same log →
   identical state across runs). **(First runbook.)**
4. Seeded PRNG (stateless integer hash) with `rngCursor` in state. **(First runbook.)**
5. `SessionRecord`, `compact(record, floorTick)` (floor as a parameter — no
   netcode constant in `engine`), `(timestamp, seq)` ordering, and a debug
   finite-number guard.
6. `engine-net` — the four windows (two horizons: `ADJUST` floor vs `CATCHUP`
   retention), the gameable-ping-resistant `estimatedPing` estimator, rollback,
   optimistic buffer + effect-key migration, resync.
7. Side-effect dedup (`effects/`) with optimistic→confirmed key migration.
8. Adapters (`Loopback`, `LocalStorage`, `ServiceWorker`) — each documents its
   single `seq`-assignment point.
9. Migrate input: replace raw `KeyboardEvent` action payloads with serializable
   payloads (`{ key: string }`, pointer coords, gamepad axes/buttons).
10. Dirty-rectangle renderer (separate spec).

### Constants to pin empirically
`TRUST_WINDOW`, `ADJUST_WINDOW` (= rollback depth = `snapshot` floor horizon;
must satisfy `estimatedPing < ADJUST_WINDOW`), `CATCHUP_WINDOW` (≥ `ADJUST_WINDOW`;
= `log` retention horizon), `BOOT_WINDOW` (≥ `CATCHUP_WINDOW`); `MS_PER_TICK = 1`.
