import { type PropsWithChildren, type ReactElement } from 'react';
import { LocalStorageWindowContext } from './local-storage-window-context.js';

interface Props {
  readonly value: Window | null;
}

export default function LocalStorageWindowProvider({
  children,
  value,
}: PropsWithChildren<Props>): ReactElement {
  return (
    <LocalStorageWindowContext.Provider value={value}>
      {children}
    </LocalStorageWindowContext.Provider>
  );
}
