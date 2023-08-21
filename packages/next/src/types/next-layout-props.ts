import type { ReactNode } from 'react';

export default interface NextLayoutProps<Params = never> {
  readonly children: ReactNode;
  readonly params: Params;
}
