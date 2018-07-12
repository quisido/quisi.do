import getState from './get-state.js';

export default function getReturnHref(): string | null {
  const { returnHref } = getState();
  return returnHref;
}
