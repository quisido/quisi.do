import type { ReactNode } from 'react';

export interface DataGridLayoutProps {
  /** Bulk action controls (e.g., delete selected, export). */
  readonly actions?: ReactNode | undefined;
  /** The data grid or table. */
  readonly children: ReactNode;
  /** Filter and search controls. */
  readonly filters?: ReactNode | undefined;
  /** Accessible label for the main content area. */
  readonly label: string;
  /** Pagination controls. */
  readonly pagination?: ReactNode | undefined;
}
