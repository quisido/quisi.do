import {
  type PropsWithChildren,
  type ReactElement,
  useLayoutEffect,
  useState,
} from 'react';
import WindowContext from '../contexts/window.js';
import { LocalStorageWindowContext } from '../modules/use-local-storage/local-storage-window-context.js';

export default function WindowProvider({
  children,
}: PropsWithChildren): ReactElement {
  const [wndw, setWndw] = useState<Window | null>(null);

  useLayoutEffect((): void => {
    setWndw(window);
  }, []);

  return (
    <LocalStorageWindowContext.Provider value={wndw}>
      <WindowContext.Provider value={wndw}>{children}</WindowContext.Provider>
    </LocalStorageWindowContext.Provider>
  );
}
