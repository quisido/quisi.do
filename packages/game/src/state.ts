import type { StringifiableRecord } from './modules/quisido-game/index.js';

export default interface State extends StringifiableRecord {
  readonly acceleration: number;
  readonly facing: number;
  readonly velocity: number;
  readonly x: number;
  readonly y: number;
}
