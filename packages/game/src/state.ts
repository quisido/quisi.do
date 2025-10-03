import type { StringifiableRecord } from './modules/quisido-browser-game/index.js';

export default interface State extends StringifiableRecord {
  readonly acceleration: readonly [number, number];
  readonly isAccelerating: readonly [boolean, boolean, boolean, boolean];
  readonly position: readonly [number, number];
  readonly velocity: readonly [number, number];
}
