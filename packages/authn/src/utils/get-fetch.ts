import getState from './get-state.js';

export default function getFetch(): Fetcher['fetch'] {
  const { fetch } = getState();
  return fetch;
}
