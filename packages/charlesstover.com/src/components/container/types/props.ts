import type { ReactNode } from 'react';

export default interface Props {
  readonly actions?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly footer?: ReactNode | undefined;
  readonly header: ReactNode;
  readonly headerClassName?: string | undefined;
  readonly marginTop?: 'large' | 'medium' | 'small' | undefined;
}
