import { toIndex } from 'fmrs';
import increment from './increment.js';

export default function createAscendingArray(length: number): number[] {
  return new Array(length).fill(null).map(toIndex).map(increment);
}
