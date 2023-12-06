'use client';

import { type PropsWithChildren, type ReactElement } from 'react';
import DarkMode from '../../contexts/dark-mode';
import DesignSystemContext from '../../contexts/design-system';
import Hostname from '../../contexts/hostname';
import useContexts from './contexts.hook';

export default function Contexts({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const { designSystem, isDarkModeEnabled } = useContexts();

  return (
    <DarkMode.Provider value={isDarkModeEnabled}>
      <DesignSystemContext.Provider value={designSystem}>
        <Hostname.Provider
          value={
            typeof window === 'undefined'
              ? 'localhost'
              : window.location.hostname
          }
        >
          {children}
        </Hostname.Provider>
      </DesignSystemContext.Provider>
    </DarkMode.Provider>
  );
}
