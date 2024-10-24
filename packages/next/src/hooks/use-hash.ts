import { useRouter } from 'next/navigation.js';
import { useEffect, experimental_useEffectEvent as useEffectEvent } from 'react';
import useForceUpdate from 'use-force-update';

const FIRST_CHARACTER = 1;

// Hash changes occur after hash change events.
const HASH_CHANGE_DELAY = 1;

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
  const getHash = (): string => {
    if (typeof window === 'undefined') {
      return '';
    }
    return window.location.hash.slice(FIRST_CHARACTER);
  };

  const hash: string = getHash();

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

    let forceUpdateTimeout: number | null = null;
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
