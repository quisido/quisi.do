import mapToIndex from './map-to-index';

export default function createIndexArray(length: number): readonly number[] {
  return new Array(length).fill(null).map(mapToIndex);
}
