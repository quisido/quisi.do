import useWindow from './use-window.js';

export default function useUserAgent(): string | null {
  const wndw: Window | null = useWindow();

  if (wndw === null) {
    return null;
  }

  return wndw.navigator.userAgent;
}
