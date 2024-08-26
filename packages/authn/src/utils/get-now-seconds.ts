import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import { getNow } from '../constants/worker.js';

export default function getNowSeconds(): number {
  return Math.floor(getNow() / MILLISECONDS_PER_SECOND);
}
