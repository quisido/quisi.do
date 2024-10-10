import type Worker from '@quisido/worker';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';

export default function getNowSeconds(this: Worker): number {
  return Math.floor(this.getNow() / MILLISECONDS_PER_SECOND);
}
