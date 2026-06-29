# Deterministic Engine Core — Implementation Runbook

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the pure, deterministic single-node core of the game engine —
restricted math, ECS with a derived index, the 1ms tick loop, seeded PRNG, and
event replay — proven by replay-equality tests.

**Architecture:** Pure functions over a JSON-serializable `World`. Time is
integer milliseconds; `step` advances exactly 1ms and runs registered systems in
a frozen order. No clock, no `Math.random`, no I/O inside the engine. Everything
here is single-node; networking (`engine-net`) is a later plan.

**Tech Stack:** TypeScript (ESM, `.js` import specifiers, `exactOptionalPropertyTypes`),
Vitest, the repo's `quisido`/`defineESLintConfig` tooling.

**Scope (from `2026-06-07-deterministic-game-engine-design.md`, items 1–4):**
§2 determinism contract, §3 ECS + derived index, §4 tick loop, PRNG. **Out of
scope:** persistence/`SessionRecord`, the four windows, rollback, effects,
adapters, rendering — later plans.

**Reference spec:** `docs/superpowers/specs/2026-06-07-deterministic-game-engine-design.md`

---

## Testing philosophy for this plan

These tests must survive trivial requirement changes (a different `MAX_VELOCITY`,
a new component, a reordered field). They therefore assert **emergent, observable
properties of the public engine API**, never internal structure:

- **Determinism / replay-equality** — the same inputs always yield byte-identical
  serialized state. This is the engine's reason to exist; it cannot be an
  "implementation detail."
- **Physical correctness** — an object stops *at* a wall, never tunnels through.
  Asserts the outcome, not how collision is computed.
- **Order semantics** — `(timestamp, seq)` ordering and snapshot-reload
  equivalence produce the same state by independent paths.
- **Serialization fidelity** — `JSON` round-trip replays identically.

Tests import only from the package entry (`src/engine/index.ts`) — the published
contract — per `.github/instructions/testing.instructions.md` (libraries assert
through `index.ts`, AAA, co-located, inject time, no real clock). A test that
names a private helper is a bug in the test.

> **Honest limitation:** true cross-JS-engine bit-identity (V8 vs JSC vs
> SpiderMonkey) cannot be asserted from one Vitest process. We test the
> *enforceable proxies* — purity, determinism within an environment, a frozen
> golden-value table, and an accuracy bound vs native `Math` — and rely on the
> §2 math restriction (lint-enforced, Story 1) to guarantee the rest by
> construction. State this in the math module's doc comment so no one "optimizes"
> the golden test away.

---

## File structure (directories now, extractable to packages later — spec §11)

```
packages/game/src/engine/
├── index.ts                      # public entry — the only import surface for tests/games
├── world.ts                      # World, Entity, Components interfaces + createWorld
├── world.test.ts
├── components.ts                 # addComponent / removeComponent (the one mutation path)
├── components.test.ts
├── component-index.ts            # derived Set<id> index; build + incremental update
├── component-index.test.ts
├── system.ts                     # System type + registry with frozen execution order
├── system.test.ts
├── loop/
│   ├── step.ts                   # one +1ms tick: runs systems in order
│   ├── advance-to.ts             # while(tick<to) step
│   ├── advance-to.test.ts
│   ├── apply-event.ts            # advanceTo(to event.timestamp) then reducer
│   ├── replay.ts                 # fold applyEvent over (timestamp,seq)-ordered log
│   └── replay.test.ts
├── event.ts                      # GameEvent interface + compareEvents (timestamp,seq)
├── event.test.ts
├── random/
│   ├── prng.ts                   # pure draw(seed,cursor)->[value,nextCursor]
│   └── prng.test.ts
├── math/
│   ├── index.ts                  # re-exports sineOf/cosineOf/... ; the ONLY trig allowed
│   ├── trigonometry.ts
│   └── trigonometry.test.ts
└── index.test.ts                 # cross-module BDD acceptance suite (the crown jewel)
```

---

## Story 1 — Restricted, deterministic math (spec §2 rule 2)

**Acceptance criteria**

- **Given** the engine math module, **When** `sineOf(x)` is called twice with the
  same `x`, **Then** it returns the exact same number (purity/determinism).
- **Given** anchor inputs with exact answers (`0`, `π/2`, `π`), **When**
  `sineOf`/`cosineOf` are called, **Then** results equal the known exact values.
- **Given** any sampled `x` in `[-4π, 4π]`, **Then** `|sineOf(x) − Math.sin(x)|`
  and the Pythagorean identity `sineOf(x)² + cosineOf(x)² ≈ 1` hold within a
  documented `EPSILON`.
- **Given** a `.ts` file under `src/engine/` (outside `math/`) that calls
  `Math.sin`/`cos`/`atan2`/`hypot`/`**`, **When** ESLint runs, **Then** it errors.

**Runbook**

- [ ] **Step 1: Create `packages/game/src/engine/math/trigonometry.test.ts`** —
  the contract tests (write first; they fail until the module exists):

```ts
import { describe, expect, it } from 'vitest';
import { cosineOf, sineOf } from './trigonometry.js';

const EPSILON = 1e-9;
const TWO_PI = Math.PI * 2;

describe('sineOf', (): void => {
  it('is deterministic for a given input', (): void => {
    expect(sineOf(1.2345)).toBe(sineOf(1.2345));
  });

  it('returns exact anchor values', (): void => {
    expect(sineOf(0)).toBe(0);
  });

  it('approximates the native sine within EPSILON across multiple periods', (): void => {
    for (let i = -100; i <= 100; i += 1) {
      const x = (i / 100) * (2 * TWO_PI);
      expect(Math.abs(sineOf(x) - Math.sin(x))).toBeLessThan(EPSILON);
    }
  });
});

describe('cosineOf', (): void => {
  it('satisfies the Pythagorean identity', (): void => {
    for (let i = -100; i <= 100; i += 1) {
      const x = (i / 100) * (2 * TWO_PI);
      const unit = sineOf(x) * sineOf(x) + cosineOf(x) * cosineOf(x);
      expect(Math.abs(unit - 1)).toBeLessThan(EPSILON);
    }
  });
});
```

- [ ] **Step 2: Run the test, confirm it fails** —
  `npx --workspace=packages/game vitest run src/engine/math/trigonometry.test.ts`
  Expected: FAIL, "Cannot find module './trigonometry.js'".

- [ ] **Step 3: Implement `packages/game/src/engine/math/trigonometry.ts`** using
  **only `+ − × ÷`** (no native trig). Recommended technique (implementer chooses
  exact coefficients, then commits them as the source of truth):
  1. Range-reduce `x` into `[−π, π]` by subtracting `TWO_PI * round(x / TWO_PI)`
     (use a committed `PI`/`TWO_PI` constant; `round` via `floor(x + 0.5)`-style
     arithmetic — no `Math.round` of trig).
  2. Evaluate a fixed-degree minimax/Taylor polynomial (degree 7–11) in the
     reduced range with hardcoded `ALL_CAPS` coefficient constants.
  3. `cosineOf(x) = sineOf(x + PI / 2)`.
  Add a doc comment: *"Only `+ − × ÷` permitted. These outputs are the
  determinism contract; changing them is a save-format break (bump
  `SessionRecord.version`)."*

- [ ] **Step 4: Run the test, confirm it passes.** If the accuracy bound fails,
  raise polynomial degree (do not switch to native trig). Tighten `EPSILON` to
  the smallest power of ten that passes, and record it in the doc comment.

- [ ] **Step 5: Create `packages/game/src/engine/math/index.ts`:**

```ts
export { cosineOf, sineOf } from './trigonometry.js';
```

- [ ] **Step 6: Add the lint ban to `packages/game/eslint.config.ts`.** Append a
  second config object targeting the engine (excluding `math/`) that forbids the
  non-correctly-rounded operations:

```ts
import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig({
  files: ['**/*.ts', '**/*.tsx'],
  name: '@quisido/game',
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    'no-ternary': 'warn',
    'no-warning-comments': 'warn',
  },
});

const NON_DETERMINISTIC_MESSAGE =
  'Not bit-stable across JS engines / breaks replay — use engine/math, the seeded PRNG, or event timestamps (spec §2 rule 2 & 4).';

const ENGINE_DETERMINISM: ESLintConfig = {
  files: ['src/engine/**/*.ts'],
  ignores: ['src/engine/math/**/*.ts'],
  name: '@quisido/game/engine-determinism',
  rules: {
    // Catches the `Math.sin(x)` member form.
    'no-restricted-properties': [
      'error',
      { object: 'Math', property: 'sin', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'cos', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'tan', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'asin', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'acos', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'atan', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'atan2', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'hypot', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'pow', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'exp', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'log', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'cbrt', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Math', property: 'random', message: NON_DETERMINISTIC_MESSAGE },
      { object: 'Date', property: 'now', message: NON_DETERMINISTIC_MESSAGE },
    ],
    // Catches the `**` / `**=` OPERATOR (no-restricted-properties cannot — spec
    // §2 bans pow, and `x ** 2` is the operator form of Math.pow) and the
    // `const { sin } = Math` / bare `Date.now` destructuring-bypass forms.
    'no-restricted-syntax': [
      'error',
      { selector: "BinaryExpression[operator='**']", message: NON_DETERMINISTIC_MESSAGE },
      { selector: "AssignmentExpression[operator='**=']", message: NON_DETERMINISTIC_MESSAGE },
    ],
  },
};

export default [...CONFIG, ENGINE_DETERMINISM];
```

> **Honest limitation of the lint ban.** `no-restricted-properties` only matches
> the literal member form `Math.sin(...)`. Aliasing bypasses it
> (`const { sin } = Math; sin(x)` or `const m = Math; m.sin(x)`). Fully closing
> that requires type-aware rules beyond this plan's scope. The lint is a
> fast tripwire for the *common* mistake; the **real** backstop is Story 6's
> replay-equality suite — any non-bit-stable op makes a cross-run/cross-engine
> replay diverge and fails those tests. State this in the engine README so no one
> mistakes the lint for a complete guarantee.

- [ ] **Step 7: Prove the ban fires.** Temporarily add a throwaway
  `src/engine/scratch.ts` containing `const z = Math.sin(1);` **and**
  `const p = 2 ** 8;`, run `npm --workspace=packages/game run eslint`, confirm it
  errors on **both** (the `no-restricted-properties` message for `Math.sin` and
  the `no-restricted-syntax` message for `**`), then delete `scratch.ts`.
  (`scratch.ts` is throwaway only — never commit it; it would also trip
  `isolatedDeclarations`.)

- [ ] **Step 8: Commit.**

```bash
git add packages/game/src/engine/math packages/game/eslint.config.ts
git commit -m "feat(game): deterministic engine math + native-trig lint ban"
```

---

## Story 2 — Serializable World + the single mutation path (spec §3)

**Acceptance criteria**

- **Given** a `World` created with a seed and timestamp, **When** it is serialized
  with `JSON.stringify` and parsed back, **Then** the parsed value deep-equals the
  original (state is pure JSON — no functions/Map/Set).
- **Given** a `World`, **When** an entity is created, **Then** it receives the next
  monotonic integer id and `nextEntityId` advances.
- **Given** an entity, **When** a component is added then removed via
  `addComponent`/`removeComponent`, **Then** querying that component reflects the
  change and the entity's other components are untouched (immutably — the input
  `World` is not mutated).

**Runbook**

- [ ] **Step 1: Create `packages/game/src/world.ts`** → place under
  `src/engine/world.ts`:

```ts
export interface Collider {
  readonly height: number;
  readonly width: number;
}

export interface Spawner {
  readonly intervalMs: number;
  readonly lastSpawnTick: number;
}

export interface Components {
  readonly acceleration?: readonly [number, number] | undefined;
  readonly collider?: Collider | undefined;
  readonly position?: readonly [number, number] | undefined;
  readonly spawner?: Spawner | undefined;
  readonly velocity?: readonly [number, number] | undefined;
}

export interface Entity {
  readonly components: Components;
}

export interface World {
  readonly entities: { readonly [id: string]: Entity | undefined };
  readonly nextEntityId: number;
  readonly rngCursor: number;
  readonly seed: number;
  readonly tick: number;
}

export interface CreateWorldOptions {
  readonly seed: number;
  readonly timestamp: number;
}

export default function createWorld({
  seed,
  timestamp,
}: CreateWorldOptions): World {
  return {
    entities: {},
    nextEntityId: 0,
    rngCursor: 0,
    seed,
    tick: timestamp,
  };
}
```

- [ ] **Step 2: Create `src/engine/world.test.ts`:**

```ts
import { describe, expect, it } from 'vitest';
import createWorld from './world.js';

describe('createWorld', (): void => {
  it('produces a JSON round-trippable value', (): void => {
    const world = createWorld({ seed: 42, timestamp: 1000 });
    expect(JSON.parse(JSON.stringify(world))).toEqual(world);
  });

  it('starts the simulation clock at the genesis timestamp', (): void => {
    expect(createWorld({ seed: 1, timestamp: 1000 }).tick).toBe(1000);
  });
});
```

- [ ] **Step 3: Run both tests, confirm pass** —
  `npx --workspace=packages/game vitest run src/engine/world.test.ts`.

- [ ] **Step 4: Create `src/engine/components.ts`** — the single mutation path.
  Returns a new `World`; never mutates the input:

```ts
import type { Components, Entity, World } from './world.js';

export interface SpawnEntityOptions {
  readonly components: Components;
  readonly world: World;
}

export interface SpawnEntityResult {
  readonly id: number;
  readonly world: World;
}

export function spawnEntity({
  components,
  world,
}: SpawnEntityOptions): SpawnEntityResult {
  const id: number = world.nextEntityId;
  return {
    id,
    world: {
      ...world,
      entities: { ...world.entities, [id]: { components } },
      nextEntityId: id + 1,
    },
  };
}

export interface SetComponentOptions<K extends keyof Components> {
  readonly id: number;
  readonly key: K;
  readonly value: Components[K];
  readonly world: World;
}

export function setComponent<K extends keyof Components>({
  id,
  key,
  value,
  world,
}: SetComponentOptions<K>): World {
  const entity: Entity | undefined = world.entities[id];
  if (entity === undefined) {
    return world;
  }

  return {
    ...world,
    entities: {
      ...world.entities,
      [id]: { components: { ...entity.components, [key]: value } },
    },
  };
}
```

- [ ] **Step 5: Create `src/engine/components.test.ts`:**

```ts
import { describe, expect, it } from 'vitest';
import { setComponent, spawnEntity } from './components.js';
import createWorld from './world.js';

describe('spawnEntity', (): void => {
  it('assigns monotonic ids and advances nextEntityId', (): void => {
    const a = spawnEntity({ components: {}, world: createWorld({ seed: 1, timestamp: 0 }) });
    const b = spawnEntity({ components: {}, world: a.world });
    expect([a.id, b.id]).toEqual([0, 1]);
    expect(b.world.nextEntityId).toBe(2);
  });

  it('does not mutate the input world', (): void => {
    const world = createWorld({ seed: 1, timestamp: 0 });
    spawnEntity({ components: {}, world });
    expect(world.entities).toEqual({});
  });
});

describe('setComponent', (): void => {
  it('updates one component without disturbing the others', (): void => {
    const { id, world } = spawnEntity({
      components: { position: [0, 0], velocity: [1, 0] },
      world: createWorld({ seed: 1, timestamp: 0 }),
    });
    const next = setComponent({ id, key: 'velocity', value: [2, 0], world });
    expect(next.entities[id]?.components).toEqual({ position: [0, 0], velocity: [2, 0] });
  });
});
```

- [ ] **Step 6: Run tests, confirm pass.**

- [ ] **Step 7: Commit.**

```bash
git add packages/game/src/engine/world.ts packages/game/src/engine/world.test.ts packages/game/src/engine/components.ts packages/game/src/engine/components.test.ts
git commit -m "feat(game): serializable World + immutable entity/component mutation path"
```

---

## Story 3 — Derived component index (spec §3, performance + replay-safety)

**Acceptance criteria**

- **Given** any `World`, **When** an index is built by scanning it and then a
  second index is built incrementally by replaying the same spawns, **Then** the
  two indexes are equal (the index is a pure function of state — what lets a
  server cold-load a snapshot).
- **Given** entities with and without `velocity`, **When** querying the velocity
  index, **Then** it yields exactly the ids that have a non-zero `velocity`,
  sorted ascending (deterministic iteration order).
- **Given** an entity whose `velocity` is set to `[0, 0]`, **Then** it leaves the
  velocity index (dormant = data, not bookkeeping).

**Runbook**

- [ ] **Step 1: Create `src/engine/component-index.test.ts`** asserting the
  build-vs-rebuild equality and the dormancy rule:

```ts
import { describe, expect, it } from 'vitest';
import { buildIndex } from './component-index.js';
import { setComponent, spawnEntity } from './components.js';
import createWorld from './world.js';

describe('buildIndex', (): void => {
  it('lists, ascending, only ids with non-zero velocity', (): void => {
    let world = createWorld({ seed: 1, timestamp: 0 });
    world = spawnEntity({ components: { velocity: [1, 0] }, world }).world; // 0
    world = spawnEntity({ components: { position: [0, 0] }, world }).world; // 1 (no velocity)
    world = spawnEntity({ components: { velocity: [0, 0] }, world }).world; // 2 (zero)
    expect([...buildIndex(world).velocity]).toEqual([0]);
  });

  it('drops an entity from the velocity index once its velocity is zeroed', (): void => {
    let world = createWorld({ seed: 1, timestamp: 0 });
    const spawned = spawnEntity({ components: { velocity: [3, 0] }, world });
    world = spawned.world;
    expect([...buildIndex(world).velocity]).toEqual([spawned.id]);
    world = setComponent({ id: spawned.id, key: 'velocity', value: [0, 0], world });
    expect([...buildIndex(world).velocity]).toEqual([]);
  });

  it('build equals rebuild: scanning a serialized-and-reloaded world yields an identical index (cold-load reproducibility)', (): void => {
    // This is the load-bearing invariant for a server cold-loading a snapshot:
    // the (non-serialized) index must be a pure function of state, so rebuilding
    // it from a JSON round-trip must equal building it from the live world.
    let world = createWorld({ seed: 1, timestamp: 0 });
    world = spawnEntity({ components: { velocity: [1, 0] }, world }).world;
    world = spawnEntity({ components: { position: [0, 0] }, world }).world;
    world = spawnEntity({ components: { velocity: [0, 2] }, world }).world;
    world = spawnEntity({ components: { velocity: [0, 0] }, world }).world;

    const live = [...buildIndex(world).velocity];
    const reloaded = [...buildIndex(JSON.parse(JSON.stringify(world)) as typeof world).velocity];
    expect(reloaded).toEqual(live);
  });
});
```

- [ ] **Step 2: Run, confirm fail** (module missing).

- [ ] **Step 3: Implement `src/engine/component-index.ts`.** Build by scanning
  entities in ascending id order; include an id in a component's set only when the
  component is present and (for vector components) non-zero:

```ts
import type { World } from './world.js';

export interface ComponentIndex {
  readonly velocity: ReadonlySet<number>;
}

const isMoving = (velocity: readonly [number, number] | undefined): boolean =>
  velocity !== undefined && (velocity[0] !== 0 || velocity[1] !== 0);

export function buildIndex(world: World): ComponentIndex {
  const velocity = new Set<number>();
  const ids: readonly number[] = Object.keys(world.entities)
    .map(Number)
    .sort((a, b) => a - b);
  for (const id of ids) {
    if (isMoving(world.entities[id]?.components.velocity)) {
      velocity.add(id);
    }
  }
  return { velocity };
}
```

- [ ] **Step 4: Run, confirm pass.**

> Note: incremental maintenance (updating the index inside `setComponent` rather
> than rebuilding) is a performance optimization deferred until profiling
> demands it. `buildIndex` is the correctness reference; the acceptance criterion
> "build equals rebuild" is what an incremental version must later satisfy.

- [ ] **Step 5: Commit.**

```bash
git add packages/game/src/engine/component-index.ts packages/game/src/engine/component-index.test.ts
git commit -m "feat(game): derived component index (pure function of state)"
```

---

## Story 4 — Tick loop & physical correctness (spec §4)

**Acceptance criteria**

- **Given** an object at `x=0` with velocity `[0.01, 0]` (px/ms) and a wall with a
  collider at `x=20`, **When** the world advances 5000ms, **Then** the object's
  `x` is exactly `20` (stopped *at* the wall) and its velocity is `[0, 0]` — it
  did **not** tunnel to `x=50`.
- **Given** any world, **When** advanced to tick `T` in one `advanceTo` call,
  **Then** the result deep-equals advancing in two calls (`T1` then `T`) — the
  loop composes; a frame boundary never changes the simulation.
- **Given** a target tick **before** the world's current tick, **Then**
  `advanceTo` returns the world unchanged (never integrates backwards).

**Runbook**

- [ ] **Step 1: Create `src/engine/system.ts`** — system type + frozen-order
  registry:

```ts
import type { World } from './world.js';

export type System = (world: World) => World;

export interface SystemRegistry {
  readonly run: (world: World) => World;
}

export default function createSystemRegistry(
  systems: readonly System[],
): SystemRegistry {
  const ordered: readonly System[] = [...systems];
  return {
    run: (world: World): World =>
      ordered.reduce((current: World, system: System): World => system(current), world),
  };
}
```

- [ ] **Step 2: Create `src/engine/loop/step.ts`** — one 1ms tick. It runs the
  registry, then increments `tick`. (Movement/collision are *systems* injected by
  the game; the loop itself is system-agnostic.)

```ts
import type { SystemRegistry } from '../system.js';
import type { World } from '../world.js';

export interface StepOptions {
  readonly registry: SystemRegistry;
  readonly world: World;
}

export default function step({ registry, world }: StepOptions): World {
  const advanced: World = registry.run(world);
  return { ...advanced, tick: advanced.tick + 1 };
}
```

- [ ] **Step 3: Create `src/engine/loop/advance-to.ts`:**

```ts
import type { SystemRegistry } from '../system.js';
import type { World } from '../world.js';
import step from './step.js';

export interface AdvanceToOptions {
  readonly registry: SystemRegistry;
  readonly toTick: number;
  readonly world: World;
}

export default function advanceTo({
  registry,
  toTick,
  world,
}: AdvanceToOptions): World {
  let current: World = world;
  while (current.tick < toTick) {
    current = step({ registry, world: current });
  }
  return current;
}
```

- [ ] **Step 4: Create `src/engine/loop/advance-to.test.ts`** — physical
  correctness via concrete `moveEntities` + `detectCollisions` systems written
  *in the test* (so the test owns the scenario, not engine internals):

```ts
import { describe, expect, it } from 'vitest';
import { setComponent } from '../components.js';
import { buildIndex } from '../component-index.js';
import createSystemRegistry, { type System } from '../system.js';
import createWorld, { type World } from '../world.js';
import advanceTo from './advance-to.js';

const WALL_X = 20;

const moveEntities: System = (world: World): World => {
  let next: World = world;
  for (const id of buildIndex(world).velocity) {
    const components = world.entities[id]?.components;
    const position = components?.position;
    const velocity = components?.velocity;
    if (position === undefined || velocity === undefined) {
      continue;
    }
    next = setComponent({
      id,
      key: 'position',
      value: [position[0] + velocity[0], position[1] + velocity[1]],
      world: next,
    });
  }
  return next;
};

const detectCollisions: System = (world: World): World => {
  let next: World = world;
  for (const id of buildIndex(world).velocity) {
    const position = world.entities[id]?.components.position;
    if (position !== undefined && position[0] >= WALL_X) {
      next = setComponent({ id, key: 'position', value: [WALL_X, position[1]], world: next });
      next = setComponent({ id, key: 'velocity', value: [0, 0], world: next });
    }
  }
  return next;
};

const registry = createSystemRegistry([moveEntities, detectCollisions]);

const movingWorld = (): World => {
  const world = createWorld({ seed: 1, timestamp: 0 });
  return {
    ...world,
    entities: { 0: { components: { position: [0, 0], velocity: [0.01, 0] } } },
    nextEntityId: 1,
  };
};

describe('advanceTo', (): void => {
  it('stops a moving object at the wall instead of tunnelling through it', (): void => {
    const result = advanceTo({ registry, toTick: 5000, world: movingWorld() });
    expect(result.entities[0]?.components.position?.[0]).toBe(WALL_X);
    expect(result.entities[0]?.components.velocity).toEqual([0, 0]);
  });

  it('composes: one big step equals two smaller steps', (): void => {
    const oneJump = advanceTo({ registry, toTick: 1500, world: movingWorld() });
    const twoJumps = advanceTo({
      registry,
      toTick: 1500,
      world: advanceTo({ registry, toTick: 700, world: movingWorld() }),
    });
    expect(twoJumps).toEqual(oneJump);
  });

  it('never integrates backwards', (): void => {
    const world = advanceTo({ registry, toTick: 100, world: movingWorld() });
    expect(advanceTo({ registry, toTick: 50, world })).toBe(world);
  });
});
```

- [ ] **Step 5: Run, confirm fail, implement until pass.** The tunnelling test is
  the headline guarantee — if it passes, the 1ms-step decision (spec §4) is
  vindicated.

- [ ] **Step 6: Commit.**

```bash
git add packages/game/src/engine/system.ts packages/game/src/engine/loop
git commit -m "feat(game): 1ms tick loop with composition + no-tunnelling guarantee"
```

---

## Story 5 — Seeded PRNG (spec §3 rngCursor, §2 rule 4)

**Acceptance criteria**

- **Given** the same `seed` and `cursor`, **When** `draw` is called, **Then** it
  returns the same value and the same `nextCursor` every time (pure, replayable).
- **Given** a starting cursor, **When** `draw` is chained N times, **Then** the
  sequence is reproducible from the seed alone (no hidden state).
- **Given** `draw`, **Then** every value is in `[0, 1)`.

**Runbook**

- [ ] **Step 1: Create `src/engine/random/prng.test.ts`:**

```ts
import { describe, expect, it } from 'vitest';
import draw from './prng.js';

describe('draw', (): void => {
  it('is pure: same seed + cursor yields same value and nextCursor', (): void => {
    expect(draw({ cursor: 5, seed: 123 })).toEqual(draw({ cursor: 5, seed: 123 }));
  });

  it('reproduces an identical sequence from the seed alone', (): void => {
    const sequenceFrom = (seed: number): readonly number[] => {
      let cursor = 0;
      const out: number[] = [];
      for (let i = 0; i < 8; i += 1) {
        const result = draw({ cursor, seed });
        out.push(result.value);
        cursor = result.nextCursor;
      }
      return out;
    };
    expect(sequenceFrom(999)).toEqual(sequenceFrom(999));
  });

  it('returns values in the unit interval', (): void => {
    for (let cursor = 0; cursor < 1000; cursor += 1) {
      const { value } = draw({ cursor, seed: 7 });
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
```

- [ ] **Step 2: Run, confirm fail.**

- [ ] **Step 3: Implement `src/engine/random/prng.ts`** as a **stateless integer
  hash** of `(seed, cursor)` — not a state-advancing generator. This matters:
  `draw` must be addressable at any `cursor` (replay jumps around), so it cannot
  rely on accumulated state. Every operation below is an integer op (`Math.imul`,
  `^`, `>>>`, `| 0`) — **`Math.imul` is mandatory** because `a * b` on two uint32s
  overflows 2^53 and loses integer precision (the bug that ruins long sessions
  where `cursor` grows large). The only non-integer step is the final divide by
  2^32, which is correctly-rounded IEEE-754 and therefore bit-identical across JS
  engines.

```ts
export interface DrawOptions {
  readonly cursor: number;
  readonly seed: number;
}

export interface DrawResult {
  readonly nextCursor: number;
  readonly value: number;
}

const UINT32: number = 0x1_0000_0000;

export default function draw({ cursor, seed }: DrawOptions): DrawResult {
  // Mix seed and cursor with integer-only ops (splitmix32-style finalizer).
  // Math.imul keeps every multiply inside int32 — never the float multiply
  // `cursor * K`, which loses precision once cursor·K exceeds 2^53.
  let t: number = (Math.imul(cursor, 0x9e3779b9) + seed) | 0;
  t = Math.imul(t ^ (t >>> 16), 0x21f0aaad);
  t = Math.imul(t ^ (t >>> 15), 0x735a2d97);
  t ^= t >>> 15;
  const value: number = (t >>> 0) / UINT32;
  return { nextCursor: cursor + 1, value };
}
```

- [ ] **Step 4: Run, confirm pass.**

- [ ] **Step 5: Commit.**

```bash
git add packages/game/src/engine/random
git commit -m "feat(game): seeded, cursor-addressable PRNG for replayable randomness"
```

---

## Story 6 — Events, ordering & the replay-equality proof (spec §4, §5 ordering)

This is the crown jewel: it proves the engine's reason to exist.

**Acceptance criteria**

- **Given** events with out-of-order timestamps, **When** sorted by
  `compareEvents`, **Then** they order by `timestamp` then `seq`.
- **Given** a snapshot and an event log, **When** `replay` runs twice, **Then**
  both results are byte-identical (`JSON.stringify` equal) — determinism.
- **Given** a log, **When** an additional event with an *earlier* timestamp is
  inserted and the log is replayed, **Then** the result equals replaying a log
  that contained that event in timestamp order from the start (rollback
  equivalence — the property `engine-net` will rely on, proven now without any
  network).
- **Given** a mid-replay `World`, **When** it is serialized, parsed back, and
  replay continues from the parsed value, **Then** the final state equals the
  never-serialized run (snapshot cold-load equivalence).

**Runbook**

- [ ] **Step 1: Create `src/engine/event.ts`:**

> **Name:** the interface is `GameEvent`, **not** `Event` — `Event` is a DOM
> global (`lib.dom`), so an unprefixed `Event` would silently resolve to the
> browser type and produce baffling structural-mismatch errors. Use `GameEvent`
> everywhere.

```ts
export interface GameEvent {
  readonly payload: { readonly [key: string]: number | string };
  readonly seq: number;
  readonly timestamp: number;
  readonly type: string;
}

export function compareEvents(a: GameEvent, b: GameEvent): number {
  if (a.timestamp !== b.timestamp) {
    return a.timestamp - b.timestamp;
  }
  return a.seq - b.seq;
}
```

- [ ] **Step 2: Create `src/engine/event.test.ts`:**

```ts
import { describe, expect, it } from 'vitest';
import { compareEvents, type GameEvent } from './event.js';

const gameEvent = (timestamp: number, seq: number): GameEvent => ({
  payload: {},
  seq,
  timestamp,
  type: 'noop',
});

describe('compareEvents', (): void => {
  it('orders by timestamp, then by seq for ties', (): void => {
    const sorted = [gameEvent(20, 1), gameEvent(10, 5), gameEvent(10, 2)].sort(
      compareEvents,
    );
    expect(
      sorted.map((e: GameEvent): readonly [number, number] => [e.timestamp, e.seq]),
    ).toEqual([[10, 2], [10, 5], [20, 1]]);
  });
});
```

- [ ] **Step 3: Create `src/engine/loop/apply-event.ts`** and
  `src/engine/loop/replay.ts`:

```ts
// apply-event.ts
import type { GameEvent } from '../event.js';
import type { SystemRegistry } from '../system.js';
import type { World } from '../world.js';
import advanceTo from './advance-to.js';

export type Reducer = (world: World, event: GameEvent) => World;

export interface ApplyEventOptions {
  readonly event: GameEvent;
  readonly reducer: Reducer;
  readonly registry: SystemRegistry;
  readonly world: World;
}

export default function applyEvent({
  event,
  reducer,
  registry,
  world,
}: ApplyEventOptions): World {
  // Determinism guard: events must arrive in non-decreasing timestamp order.
  // advanceTo cannot integrate backwards, so an earlier-than-current event is a
  // caller bug (mis-sorted log) — fail loudly rather than silently wrong-state.
  if (event.timestamp < world.tick) {
    throw new Error(
      `applyEvent received event at ${event.timestamp} before world tick ${world.tick}`,
    );
  }

  const integrated: World = advanceTo({ registry, toTick: event.timestamp, world });
  return reducer(integrated, event);
}
```

```ts
// replay.ts
import { compareEvents, type GameEvent } from '../event.js';
import type { SystemRegistry } from '../system.js';
import type { World } from '../world.js';
import applyEvent, { type Reducer } from './apply-event.js';

export interface ReplayOptions {
  readonly events: readonly GameEvent[];
  readonly reducer: Reducer;
  readonly registry: SystemRegistry;
  readonly snapshot: World;
}

export default function replay({
  events,
  reducer,
  registry,
  snapshot,
}: ReplayOptions): World {
  const ordered: readonly GameEvent[] = [...events].sort(compareEvents);
  return ordered.reduce(
    (world: World, event: GameEvent): World =>
      applyEvent({ event, reducer, registry, world }),
    snapshot,
  );
}
```

- [ ] **Step 4: Create `src/engine/index.ts`** (public entry — the test surface):

```ts
export { default as createWorld } from './world.js';
export type { Components, Entity, World } from './world.js';
export { setComponent, spawnEntity } from './components.js';
export { buildIndex } from './component-index.js';
export { default as createSystemRegistry, type System } from './system.js';
export { compareEvents, type GameEvent } from './event.js';
export { default as advanceTo } from './loop/advance-to.js';
export { default as applyEvent, type Reducer } from './loop/apply-event.js';
export { default as replay } from './loop/replay.js';
export { default as draw } from './random/prng.js';
export { cosineOf, sineOf } from './math/index.js';
```

- [ ] **Step 5: Create `src/engine/index.test.ts`** — the acceptance suite,
  importing **only** from `./index.js`:

```ts
import { describe, expect, it } from 'vitest';
import {
  buildIndex,
  createSystemRegistry,
  createWorld,
  type GameEvent,
  replay,
  setComponent,
  type System,
  type World,
} from './index.js';

const WALL_X = 20;
const SPEED = 0.01; // px/ms — reaches the wall at tick 100 + 20/0.01 = 2100

const moveEntities: System = (world: World): World => {
  let next: World = world;
  for (const id of buildIndex(world).velocity) {
    const c = world.entities[id]?.components;
    if (c?.position === undefined || c.velocity === undefined) {
      continue;
    }
    next = setComponent({
      id,
      key: 'position',
      value: [c.position[0] + c.velocity[0], c.position[1] + c.velocity[1]],
      world: next,
    });
  }
  return next;
};

const detectCollisions: System = (world: World): World => {
  let next: World = world;
  for (const id of buildIndex(world).velocity) {
    const p = world.entities[id]?.components.position;
    if (p !== undefined && p[0] >= WALL_X) {
      next = setComponent({ id, key: 'position', value: [WALL_X, p[1]], world: next });
      next = setComponent({ id, key: 'velocity', value: [0, 0], world: next });
    }
  }
  return next;
};

const registry = createSystemRegistry([moveEntities, detectCollisions]);

// 'launch' starts entity 0 moving; 'noop' exists only to drive advanceTo forward
// to its timestamp (motion happens during integration BETWEEN events, so a single
// launch event integrates to nothing — a later event is what makes time pass).
const reducer = (world: World, event: GameEvent): World =>
  event.type === 'launch'
    ? setComponent({ id: 0, key: 'velocity', value: [SPEED, 0], world })
    : world;

const snapshot = (): World => ({
  ...createWorld({ seed: 1, timestamp: 0 }),
  entities: { 0: { components: { position: [0, 0], velocity: [0, 0] } } },
  nextEntityId: 1,
});

const launch = (timestamp: number, seq: number): GameEvent => ({
  payload: {},
  seq,
  timestamp,
  type: 'launch',
});

const noop = (timestamp: number, seq: number): GameEvent => ({
  payload: {},
  seq,
  timestamp,
  type: 'noop',
});

const run = (events: readonly GameEvent[]): World =>
  replay({ events, reducer, registry, snapshot: snapshot() });

describe('engine replay', (): void => {
  it('is deterministic: identical inputs yield byte-identical state', (): void => {
    // Two independently-built logs (not a shared reference) — also catches
    // accidental input mutation, not just output purity.
    const a = run([launch(100, 0), noop(3000, 1)]);
    const b = run([launch(100, 0), noop(3000, 1)]);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('moves the object to the wall and stops it (no tunnelling)', (): void => {
    // launch at 100, then a noop at 3000 forces advanceTo to integrate 2900ms.
    // The object would reach x=29 unobstructed; the wall must stop it AT 20.
    const result = run([launch(100, 0), noop(3000, 1)]);
    expect(result.entities[0]?.components.position?.[0]).toBe(WALL_X);
    expect(result.entities[0]?.components.velocity).toEqual([0, 0]);
  });

  it('rollback equivalence: result depends only on the event set, not arrival order, and an inserted earlier event changes the outcome', (): void => {
    // The property engine-net relies on: re-deriving from the floor with a late
    // event inserted yields the SAME state as if it had always been there —
    // independent of the order events were handed to replay.
    //
    // Baseline: the late event ALONE (object never launched → never moves).
    const lateOnly = run([noop(3000, 1)]);
    expect(lateOnly.entities[0]?.components.position?.[0]).toBe(0); // forward progress, unmoved

    // Same two events, fed to replay in OPPOSITE input orders. replay must sort
    // internally, so both must agree — and must differ from the baseline,
    // proving the inserted earlier launch actually altered the result (not vacuous).
    const insertedThenLate = run([launch(100, 0), noop(3000, 1)]);
    const lateThenInserted = run([noop(3000, 1), launch(100, 0)]);

    expect(JSON.stringify(insertedThenLate)).toBe(JSON.stringify(lateThenInserted));
    expect(JSON.stringify(insertedThenLate)).not.toBe(JSON.stringify(lateOnly));
    // And the concrete outcome: launched + integrated 2900ms → stopped at the wall.
    expect(insertedThenLate.entities[0]?.components.position?.[0]).toBe(WALL_X);
  });

  it('snapshot cold-load equivalence: serialize mid-replay and continue', (): void => {
    const full = run([launch(100, 0), noop(3000, 1)]);
    const mid = replay({ events: [launch(100, 0)], reducer, registry, snapshot: snapshot() });
    const reloaded: World = JSON.parse(JSON.stringify(mid)) as World;
    const continued = replay({ events: [noop(3000, 1)], reducer, registry, snapshot: reloaded });
    expect(JSON.stringify(continued)).toBe(JSON.stringify(full));
  });
});
```

- [ ] **Step 6: Run the full engine suite** —
  `npx --workspace=packages/game vitest run src/engine`. All green.

- [ ] **Step 7: Typecheck explicitly.** `quisido test` runs Vitest via esbuild,
  which **strips types without checking them** — a pure type error (e.g. the
  `Event`-vs-`GameEvent` DOM-global clash) passes Vitest but is still a bug. Run
  `npm --workspace=packages/game run tsc` and fix any type errors. (`tsc` here is
  `tsc --skipLibCheck` per the package's existing script.)

- [ ] **Step 8: Enable the package quality gate.** Change
  `packages/game/package.json` `"test"` from `"exit 0"` to `"quisido test"`, then
  run `npm --workspace=packages/game test`. Per CLAUDE.md this runs
  attw/eslint/publint/quisidoTest/vitest in parallel — fix any lint/packaging
  findings it surfaces. Note it does **not** run `tsc` (hence Step 7 is separate).

- [ ] **Step 9: Commit.**

```bash
git add packages/game/src/engine packages/game/package.json
git commit -m "feat(game): event replay with determinism, rollback & cold-load equivalence proofs"
```

---

## Self-review

**Spec coverage (items 1–4):** §2 rule 1 (1ms step) → Story 4; rule 2 (math ban)
→ Story 1; rule 3 (ascending-id iteration) → Story 3; rule 4 (no clock/random) →
Story 1 lint + Story 5 PRNG. §3 World/serialization → Story 2; derived index →
Story 3; system registry/frozen order → Story 4. §4 step/advanceTo/applyEvent/
replay → Stories 4 & 6. §5 `(timestamp, seq)` ordering → Story 6. Deferred items
(5–10: persistence, windows, rollback *mechanism*, effects, adapters, input
migration, renderer) are explicitly out of scope; **rollback equivalence is
proven as a pure property now** so the later `engine-net` plan builds on solid
ground.

**Placeholders:** none — every code step is complete except the trig polynomial
*coefficients* (Story 1 Step 3), which are intentionally implementer-chosen and
then frozen by the golden/accuracy tests; the contract (purity + accuracy bound +
identity) is fully specified.

**Type consistency:** `World`, `Components`, `Entity`, `GameEvent` (never `Event`
— that is a DOM global), `System`, `SystemRegistry`, `Reducer` are defined once
and imported identically across Stories 2–6.
`spawnEntity`/`setComponent`/`buildIndex`/`advanceTo`/`applyEvent`/`replay`/`draw`
keep the same `Options`-object signatures from definition through the acceptance
suite and the public `index.ts`.

**Convention check:** ESM `.js` specifiers, `Options`-object params,
`readonly`/`| undefined` for optional props (`exactOptionalPropertyTypes`),
`ALL_CAPS` constants, verb function names, co-located `*.test.ts`, AAA, assert
through `index.ts` — all per the repo instruction files.

**Review fixes applied (2026-06-08, from two adversarial reviews):**
- `Event` → `GameEvent` everywhere (DOM-global clash; was a real type error).
- Story 6 "reaches the wall" was vacuous (one event never integrated → object at
  x=0, asserting `0 ≤ 20`). Rewritten to launch + a later `noop` that drives
  `advanceTo` 2900ms, asserting `position[0] === WALL_X` and velocity zeroed.
- Story 6 "rollback equivalence" was a tautology (both arms sorted identically).
  Rewritten to feed opposite input orders, assert they agree **and** differ from
  the no-launch baseline (so an inserted earlier event provably changes outcome).
- Story 5 PRNG used a float multiply `cursor * K` (loses integer precision past
  cursor ≈ 4.9M — the long-session case). Replaced with an all-`Math.imul`
  integer hash; only the final ÷2³² is float (correctly rounded → bit-stable).
- Story 1 lint: added `no-restricted-syntax` for the `**` operator (which
  `no-restricted-properties` cannot catch) and more `Math.*` members; documented
  the destructuring-bypass limitation and that replay-equality is the real
  backstop.
- Story 3: added the "build equals rebuild" test (the first acceptance criterion,
  previously untested) via a JSON round-trip.
- Story 6: added `tsc` as an explicit step — `quisido test` does not typecheck.
- `applyEvent` gained a determinism guard (throws if `event.timestamp <
  world.tick`) so a mis-sorted log fails loudly instead of silently wrong-stating.

**Known scope limits (deferred to the right layer, not bugs in this plan):**
- True cross-JS-engine bit-identity is asserted by construction (the math ban +
  IEEE-754's per-operator rounding guarantee) and proven *within* one engine by
  replay-equality; a CI matrix across engines is a later hardening task.
- Non-finite / `-0` state hygiene (a real spec gap, §2/§4) belongs to the spec's
  contract and the persistence plan; the pure core here never produces them in
  the tested scenarios, but a `freezeFiniteNumbers`-style guard is a later item.
