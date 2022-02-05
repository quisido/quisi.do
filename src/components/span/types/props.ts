import type { ReactNode } from 'react';

export default interface Props {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly color?: 'inherit' | 'label' | 'secondary-body' | undefined;
  readonly element?: 'h2' | 'p' | undefined;
  readonly size?: 'large' | 'medium-heading' | 'medium' | 'small' | undefined;
}
