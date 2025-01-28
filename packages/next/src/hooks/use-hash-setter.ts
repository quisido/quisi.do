import { useRouter } from 'next/navigation.js';
import { useCallback } from 'react';
import mapHashToHref from '../utils/map-hash-to-href.js';

export default function useHashSetter(): (
  method: 'push' | 'replace',
  hash: string,
) => void {
  // Contexts
  const router = useRouter();

  // Callbacks
  return useCallback(
    (method: 'push' | 'replace', newHash: string): void => {
      if (typeof window === 'undefined') {
        return;
      }

      const scroll: boolean = method === 'push';
      const href: string = mapHashToHref(newHash);
      router[method](href, {
        scroll,
      });

      const event: HashChangeEvent = new HashChangeEvent('hashchange', {
        newURL: href,
        oldURL: window.location.href,
      });

      window.dispatchEvent(event);
    },
    [router],
  );
}
