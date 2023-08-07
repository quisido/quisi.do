import type { ReactNode } from 'react';

export default interface Props {
  readonly actions?: ReactNode | undefined;
  readonly children: ReactNode;
}
