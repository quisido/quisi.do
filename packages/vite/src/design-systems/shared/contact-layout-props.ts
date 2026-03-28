import type { ReactNode } from 'react';

export interface ContactLayoutProps {
  /** Contact form. */
  readonly children: ReactNode;
  /** Company information, address, or map. */
  readonly info: ReactNode;
  /** Accessible label for the main content area. */
  readonly label: string;
}
