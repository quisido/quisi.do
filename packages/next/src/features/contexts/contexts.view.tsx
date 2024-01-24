'use client';

import { type PropsWithChildren, type ReactElement, memo } from 'react';
import DarkMode from '../../contexts/dark-mode.js';
import DesignSystemContext from '../../contexts/design-system.js';
import Hostname from '../../contexts/hostname.js';
import SessionId from '../../contexts/session-id.js';
import useContexts from './contexts.hook.js';

function Contexts({ children }: Readonly<PropsWithChildren>): ReactElement {
  const { designSystem, hostname, isDarkModeEnabled, sessionId } =
    useContexts();

  return (
    <DarkMode.Provider value={isDarkModeEnabled}>
      <DesignSystemContext.Provider value={designSystem}>
        <Hostname.Provider value={hostname}>
          <SessionId.Provider value={sessionId}>{children}</SessionId.Provider>
        </Hostname.Provider>
      </DesignSystemContext.Provider>
    </DarkMode.Provider>
  );
}

export default memo(Contexts);
