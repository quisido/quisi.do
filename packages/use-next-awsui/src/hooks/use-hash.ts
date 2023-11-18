'use client';

import { useEffect, useState } from 'react';
import mapWindowToHash from '../utils/map-window-to-hash.js';

const getInitialHash = (): string => mapWindowToHash(window);

export default function useHash(): string {
  // States
  const [hash, setHash] = useState(getInitialHash);

  // Effects
  useEffect((): VoidFunction => {
    const handleHashChange = (e: HashChangeEvent) => {
      const { hash: newHash } = new URL(e.newURL);
      setHash(newHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return (): void => {
      window.addEventListener('hashchange', handleHashChange);
    };
  }, []);

  return hash;
}
