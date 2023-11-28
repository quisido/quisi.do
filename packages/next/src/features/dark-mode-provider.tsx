'use client';

import {
  type PropsWithChildren,
  type ReactElement,
  memo,
  useState,
} from 'react';
import { DarkModeProvider } from '../contexts/dark-mode.js';

function DarkModeProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  const isDarkModeEnabled = useState(false);

  return (
    <DarkModeProvider value={isDarkModeEnabled}>{children}</DarkModeProvider>
  );
}

export default memo(DarkModeProviderFeature);
