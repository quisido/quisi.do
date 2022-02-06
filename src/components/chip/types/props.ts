import type { ReactNode } from 'react';

export default interface Props {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly title?: ReactNode | undefined;
}
