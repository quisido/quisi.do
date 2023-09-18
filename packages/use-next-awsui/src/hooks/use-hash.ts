'use client';

import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const getInitialHash = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.hash;
};

export default function useHash(): string {
  // Contexts
  const router: NextRouter = useRouter();

  // States
  const [hash, setHash] = useState(getInitialHash);

  // Effects
  useEffect((): VoidFunction => {
    const handleHashChangeStart = (url: string) => {
      const { hash: newHash } = new URL(url);
      setHash(newHash);
    };

    router.events.on('hashChangeStart', handleHashChangeStart);
    return (): void => {
      router.events.off('hashChangeStart', handleHashChangeStart);
    };
  }, [router.events]);

  return hash;
}
