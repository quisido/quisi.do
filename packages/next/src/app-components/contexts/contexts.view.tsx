'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import DarkModeContext from '../../contexts/dark-mode';
import DesignSystemContext from '../../contexts/design-system';
import Hostname from '../../contexts/hostname';
import useContexts from './contexts.hook';

export default function Contexts({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const { designSystem, isDarkModeEnabled } = useContexts();

  return (
    <DarkModeContext.Provider value={isDarkModeEnabled}>
      <DesignSystemContext.Provider value={designSystem}>
        <Hostname.Provider value={window.location.hostname}>
          {children}
        </Hostname.Provider>
      </DesignSystemContext.Provider>
    </DarkModeContext.Provider>
  );
}
