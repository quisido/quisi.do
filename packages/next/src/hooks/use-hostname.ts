'use client';

import useWindow from '../hooks/use-window.js';

export default function useHostname(): string {
  const wndw: Window | null = useWindow();

  if (wndw === null) {
    return 'quisi.do';
  }

  return wndw.location.hostname;
}
