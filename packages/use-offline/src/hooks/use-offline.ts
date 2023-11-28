'use client';

import { useEffect, useState } from 'react';

export default function useOffline(): boolean {
  // Technical debt: Determine the correct default value.
  const [isOffline, setIsOffline] = useState(false);

  useEffect((): (() => void) => {
    const handleOffline = (): void => {
      setIsOffline(true);
    };

    const handleOnline = (): void => {
      setIsOffline(false);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return (): void => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return isOffline;
}
