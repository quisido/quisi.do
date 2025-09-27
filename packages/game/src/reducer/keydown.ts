import type State from '../state.js';

const MAX_ACCELERATION = 0.1;
const MAX_VELOCITY = 1;
const TORQUE = 0.01;

const accelerate = (value: number, direction: number): number => {
  return Math.max(
    -MAX_ACCELERATION,
    Math.min(MAX_ACCELERATION, value + direction * TORQUE),
  );
};

const calculateAcceleration = (
  [x, y]: readonly [number, number],
  [isUp, isRight, isDown, isLeft]: readonly [
    boolean,
    boolean,
    boolean,
    boolean,
  ],
): readonly [number, number] => {
  return [
    accelerate(x, (isRight ? 1 : 0) - (isLeft ? 1 : 0)),
    accelerate(y, (isDown ? 1 : 0) - (isUp ? 1 : 0)),
  ];
};

const calculateVelocity = (
  [vx, vy]: readonly [number, number],
  [ax, ay]: readonly [number, number],
): readonly [number, number] => {
  return [
    Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vx + ax)),
    Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vy + ay)),
  ];
};

export default function reduceKeydown(
  state: State,
  payload: KeyboardEvent,
): State {
  switch (payload.key) {
    case 'ArrowDown': {
      const { acceleration, isAccelerating, position, velocity } = state;
      const newAcceleration = calculateAcceleration(
        acceleration,
        isAccelerating,
      );
      const newVelocity = calculateVelocity(velocity, newAcceleration);
      return {
        ...state,
        acceleration: newAcceleration,
        isAccelerating: [
          isAccelerating[0],
          isAccelerating[1],
          true,
          isAccelerating[3],
        ],
        position: [position[0] + newVelocity[0], position[1] + newVelocity[1]],
        velocity: newVelocity,
      };
    }

    case 'ArrowLeft': {
      const { acceleration, isAccelerating, position, velocity } = state;
      const newAcceleration = calculateAcceleration(
        acceleration,
        isAccelerating,
      );
      const newVelocity = calculateVelocity(velocity, newAcceleration);
      return {
        ...state,
        acceleration: newAcceleration,
        isAccelerating: [
          isAccelerating[0],
          isAccelerating[1],
          isAccelerating[2],
          true,
        ],
        position: [position[0] + newVelocity[0], position[1] + newVelocity[1]],
        velocity: newVelocity,
      };
    }

    case 'ArrowRight': {
      const { acceleration, isAccelerating, position, velocity } = state;
      const newAcceleration = calculateAcceleration(
        acceleration,
        isAccelerating,
      );
      const newVelocity = calculateVelocity(velocity, newAcceleration);
      return {
        ...state,
        acceleration: newAcceleration,
        isAccelerating: [
          isAccelerating[0],
          true,
          isAccelerating[2],
          isAccelerating[3],
        ],
        position: [position[0] + newVelocity[0], position[1] + newVelocity[1]],
        velocity: newVelocity,
      };
    }

    case 'ArrowUp': {
      const { acceleration, isAccelerating, position, velocity } = state;
      const newAcceleration = calculateAcceleration(
        acceleration,
        isAccelerating,
      );
      const newVelocity = calculateVelocity(velocity, newAcceleration);
      return {
        ...state,
        acceleration: newAcceleration,
        isAccelerating: [
          true,
          isAccelerating[1],
          isAccelerating[2],
          isAccelerating[3],
        ],
        position: [position[0] + newVelocity[0], position[1] + newVelocity[1]],
        velocity: newVelocity,
      };
    }

    default:
      return state;
  }
}
