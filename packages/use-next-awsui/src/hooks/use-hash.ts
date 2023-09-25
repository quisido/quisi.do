'use client';

import { useEffect, useState } from 'react';

const getInitialHash = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.hash;
};

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
