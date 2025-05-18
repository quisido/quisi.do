import { useCallback } from 'react';
import mapHashToHref from '../utils/map-hash-to-href.js';
import useNavigation from './use-navigation.js';

export default function useHashSetter(): (
  method: 'push' | 'replace',
  hash: string,
) => void {
  // Contexts
  const navigate = useNavigation();

  // Callbacks
  return useCallback(
    (method: 'push' | 'replace', newHash: string): void => {
      if (typeof window === 'undefined') {
        return;
      }

      const href: string = mapHashToHref(newHash);
      navigate(href, method);

      const event: HashChangeEvent = new HashChangeEvent('hashchange', {
        newURL: href,
        oldURL: window.location.href,
      });

      window.dispatchEvent(event);
    },
    [navigate],
  );
}
