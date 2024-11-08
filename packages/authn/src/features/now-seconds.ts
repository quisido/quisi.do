import type Worker from '@quisido/worker';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';

export default function nowSeconds(this: Worker): number {
  return Math.floor(this.now() / MILLISECONDS_PER_SECOND);
}
