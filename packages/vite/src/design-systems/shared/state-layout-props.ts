import type { ReactNode } from 'react';
import type { HeadingOrLabel } from './heading-or-label.js';

interface Props {
  /** Action to recover (e.g., "Go back home" button). */
  readonly action?: ReactNode | undefined;
  /** Status message describing the state. */
  readonly children: ReactNode;
  /** Decorative illustration (e.g., 404 graphic). */
  readonly illustration?: ReactNode | undefined;
}

export type StateLayoutProps = HeadingOrLabel<Props>;
