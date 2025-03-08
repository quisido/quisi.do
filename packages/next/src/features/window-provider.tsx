'use client';

import {
  useLayoutEffect,
  useState,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import WindowContext from '../contexts/window.js';

export default function WindowProvider({
  children,
}: PropsWithChildren): ReactElement {
  const [wndw, setWndw] = useState<Window | null>(null);

  useLayoutEffect((): void => {
    setWndw(window);
  }, []);

  return (
    <WindowContext.Provider value={wndw}>{children}</WindowContext.Provider>
  );
}
