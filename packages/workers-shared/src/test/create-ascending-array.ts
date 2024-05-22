import { mapToIndex } from 'fmrs';

export default function createAscendingArray(length: number): number[] {
  return new Array(length).fill(null).map(mapToIndex);
}
