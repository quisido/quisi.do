import { MILLISECONDS_PER_SECOND } from '../constants/time.js';

export default function getNowSeconds(): number {
  return Math.floor(Date.now() / MILLISECONDS_PER_SECOND);
}
