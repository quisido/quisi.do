import type { NEXT_DATA } from 'next/dist/shared/lib/utils.js';

export default function getNextData(): NEXT_DATA | Record<never, never> {
  if ('__NEXT_DATA__' in window) {
    return window.__NEXT_DATA__;
  }

  return {};
}
