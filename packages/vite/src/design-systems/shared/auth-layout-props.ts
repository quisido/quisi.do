import type { ReactNode } from 'react';
import type { HeadingOrLabel } from './heading-or-label.js';

interface Props {
  /** Auth form content (login, signup, password reset). */
  readonly children: ReactNode;
  /** Optional decorative media (e.g., image on one side of a split screen). */
  readonly media?: ReactNode | undefined;
}

export type AuthLayoutProps = HeadingOrLabel<Props>;
