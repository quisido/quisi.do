import getHash from '../utils/get-hash.js';
import useHashChangeUpdates from './use-hash-change-updates.js';
import useHashSetter from './use-hash-setter.js';

export default function useHash(): readonly [
  string,
  (method: 'push' | 'replace', hash: string) => void,
] {
  // States
  const hash: string = getHash();

  // Callbacks
  const setHash = useHashSetter();

  // Effects
  useHashChangeUpdates();

  return [hash, setHash];
}
