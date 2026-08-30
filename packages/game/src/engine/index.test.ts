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

const SPEED = 0.01;
const WALL_X = 20;

const moveEntities: System = (world: World): World => {
  let nextWorld: World = world;

  for (const id of buildIndex(world).velocity) {
    const components = world.entities[id]?.components;

    // Design §3: systems compose only entities carrying the components they need.
    if (components?.position === undefined || components.velocity === undefined) {
      continue;
    }

    nextWorld = setComponent({
      id,
      key: 'position',
      value: [
        components.position[0] + components.velocity[0],
        components.position[1] + components.velocity[1],
      ],
      world: nextWorld,
    });
  }

  return nextWorld;
};

const detectCollisions: System = (world: World): World => {
  let nextWorld: World = world;

  for (const id of buildIndex(world).velocity) {
    const position = world.entities[id]?.components.position;

    // Design §4: collisions emerge during integration and stop at the boundary.
    if (position !== undefined && position[0] >= WALL_X) {
      nextWorld = setComponent({
        id,
        key: 'position',
        value: [WALL_X, position[1]],
        world: nextWorld,
      });
      nextWorld = setComponent({
        id,
        key: 'velocity',
        value: [0, 0],
        world: nextWorld,
      });
    }
  }

  return nextWorld;
};

const registry = createSystemRegistry([moveEntities, detectCollisions]);

const reduceEvent = (world: World, event: GameEvent): World => {
  // Design §1 and §4: authority-emitted inputs are the only discrete state changes.
  if (event.type === 'launch') {
    return setComponent({
      id: 0,
      key: 'velocity',
      value: [SPEED, 0],
      world,
    });
  }

  return world;
};

const createSnapshot = (): World => ({
  ...createWorld({ seed: 1, timestamp: 0 }),
  entities: {
    0: {
      components: {
        position: [0, 0],
        velocity: [0, 0],
      },
    },
  },
  nextEntityId: 1,
});

const createAuthorityEvents = (): readonly GameEvent[] => [
  {
    payload: {},
    seq: 0,
    timestamp: 100,
    type: 'launch',
  },
  {
    payload: {},
    seq: 1,
    timestamp: 3000,
    type: 'noop',
  },
];

const replayClient = (): World =>
  replay({
    events: createAuthorityEvents(),
    reducer: reduceEvent,
    registry,
    snapshot: createSnapshot(),
  });

describe('engine replay', (): void => {
  it('replays authority actions identically on two clients and stops at the wall', (): void => {
    // Runbook §2 and §4: independent clients replay identical inputs byte-for-byte.
    const firstClientWorld = replayClient();
    const secondClientWorld = replayClient();

    expect(JSON.stringify(firstClientWorld)).toBe(
      JSON.stringify(secondClientWorld),
    );
    expect(firstClientWorld.entities[0]?.components.position).toEqual([
      WALL_X,
      0,
    ]);
    expect(firstClientWorld.entities[0]?.components.velocity).toEqual([0, 0]);
    expect(firstClientWorld.tick).toBe(3000);
  });
});
