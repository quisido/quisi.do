import type { ReactNode } from 'react';

export default interface Props {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly element?: 'h2' | undefined;
  readonly marginBottom?: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft?: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight?: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop?: 'large' | 'medium' | 'small' | undefined;
}
