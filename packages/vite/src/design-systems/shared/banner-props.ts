import type { ReactNode } from 'react';

export interface BannerProps {
  readonly children: ReactNode;
  readonly label?: string | undefined;
}
