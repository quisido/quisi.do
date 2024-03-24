import { useRouter } from 'next/navigation.js';
import { useEffect } from 'react';
import useForceUpdate from 'use-force-update';
import useEffectEvent from './use-effect-event';

const FIRST_CHARACTER = 1;
const HASH_CHANGE_DELAY = 1; // Hash changes occur after hash change events.

const mapHashToNewURL = (hash: string): string => {
  const { pathname, search } = window.location;
  if (hash === '') {
    return `${pathname}${search}`;
  }
  return `${pathname}${search}#${hash}`;
};

export default function useHash(): readonly [
  string,
  (method: 'push' | 'replace', hash: string) => void,
] {
  // Contexts
  const router = useRouter();
  const forceUpdate = useForceUpdate();

  // States
  const hash: string =
    typeof window === 'undefined'
      ? ''
      : window.location.hash.slice(FIRST_CHARACTER);

  // Callbacks
  const setHash = useEffectEvent(
    (method: 'push' | 'replace', newHash: string): void => {
      if (typeof window === 'undefined') {
        return;
      }

      const scroll: boolean = method === 'push';
      const newURL: string = mapHashToNewURL(newHash);
      router[method](newURL, {
        scroll,
      });

      const event: HashChangeEvent = new HashChangeEvent('hashchange', {
        newURL,
        oldURL: window.location.href,
      });
      window.dispatchEvent(event);
    },
  );

  // Effects
  useEffect((): VoidFunction | undefined => {
    if (typeof window === 'undefined') {
      return;
    }

    let forceUpdateTimeout: number | undefined = undefined;
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

  return [hash, setHash];
}
