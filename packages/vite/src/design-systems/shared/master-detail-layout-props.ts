import type { ReactNode } from 'react';

export interface MasterDetailLayoutProps {
  /** Detail pane content displayed when an item is selected. */
  readonly children: ReactNode;
  /** Accessible label for the main content area. */
  readonly label: string;
  /** Master list of selectable items. */
  readonly master: ReactNode;
  /** Accessible label for the master list pane. */
  readonly masterLabel: string;
}
