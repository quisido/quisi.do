'use client';

import { useEffect, useState } from 'react';
import getHash from '../utils/get-hash.js';

export default function useHash(): string {
  // States
  const [hash, setHash] = useState(getHash);

  // Effects
  useEffect((): VoidFunction => {
    const handleHashChange = (e: HashChangeEvent): void => {
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
