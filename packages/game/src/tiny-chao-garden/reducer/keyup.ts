import type State from '../state.js';

export default function reduceKeyup(
  state: State,
  payload: KeyboardEvent,
): State {
  switch (payload.key) {
    case 'ArrowDown':
      return {
        ...state,
        isAccelerating: [
          state.isAccelerating[0],
          state.isAccelerating[1],
          false,
          state.isAccelerating[3],
        ],
      };

    case 'ArrowLeft':
      return {
        ...state,
        isAccelerating: [
          state.isAccelerating[0],
          state.isAccelerating[1],
          state.isAccelerating[2],
          false,
        ],
      };

    case 'ArrowRight':
      return {
        ...state,
        isAccelerating: [
          state.isAccelerating[0],
          false,
          state.isAccelerating[2],
          state.isAccelerating[3],
        ],
      };
    case 'ArrowUp':
      return {
        ...state,
        isAccelerating: [
          false,
          state.isAccelerating[1],
          state.isAccelerating[2],
          state.isAccelerating[3],
        ],
      };

    default:
      return state;
  }
}
