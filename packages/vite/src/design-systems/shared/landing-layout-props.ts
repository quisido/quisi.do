import type { ReactNode } from 'react';

export interface LandingLayoutProps {
  /** Call-to-action section at the bottom of the page. */
  readonly callToAction?: ReactNode | undefined;
  /** Main feature content blocks (e.g., alternating Z-pattern sections). */
  readonly children: ReactNode;
  /** Large hero section at the top of the page. */
  readonly hero: ReactNode;
  /** Accessible label for the main content area. */
  readonly label: string;
}
