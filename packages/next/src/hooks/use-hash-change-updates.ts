import { useEffect } from 'react';
import useForceUpdate from 'use-force-update';

// Hash changes occur after hash change events.
const HASH_CHANGE_DELAY = 1;

export default function useHashChangeUpdates(): void {
  // Contexts
  const forceUpdate = useForceUpdate();

  // Effects
  useEffect((): VoidFunction | undefined => {
    if (typeof window === 'undefined') {
      return;
    }

    let forceUpdateTimeout = 0;
    const handler = (): void => {
      // Delay update until `window.location.hash` has updated.
      forceUpdateTimeout = window.setTimeout(forceUpdate, HASH_CHANGE_DELAY);
    };
    window.addEventListener('hashchange', handler, {
      once: false,
      passive: true,
    });
    return (): void => {
      window.clearTimeout(forceUpdateTimeout);
      window.removeEventListener('hashchange', handler);
    };
  }, [forceUpdate]);
}
