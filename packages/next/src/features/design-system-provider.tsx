'use client';

import {
  type PropsWithChildren,
  type ReactElement,
  memo,
  useState,
} from 'react';
import DesignSystem from '../constants/design-system.js';
import { DesignSystemProvider } from '../contexts/design-system.js';

function DesignSystemProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  const designSystem = useState(DesignSystem.Quisi);
  return (
    <DesignSystemProvider value={designSystem}>{children}</DesignSystemProvider>
  );
}

export default memo(DesignSystemProviderFeature);
