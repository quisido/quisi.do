import type { ReactNode } from 'react';

export interface DashboardLayoutProps {
  /** Dashboard header content (e.g., breadcrumbs, search, user menu). */
  readonly banner?: ReactNode | undefined;
  /** Main dashboard content area (e.g., card grid, widgets). */
  readonly children: ReactNode;
  /** Accessible label for the main content area. */
  readonly label: string;
  /** Side navigation content. */
  readonly navigation: ReactNode;
  /** Accessible label for the navigation area. */
  readonly navigationLabel: string;
}
