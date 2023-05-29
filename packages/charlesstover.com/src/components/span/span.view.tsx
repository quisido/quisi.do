import type { ReactElement, ReactNode } from 'react';
import DesignSystem from '../design-system';

export interface Props {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly color?: 'inherit' | 'label' | 'secondary-body' | undefined;
  readonly element?: 'h2' | 'p' | undefined;
  readonly size?:
    | 'large'
    | 'medium-heading'
    | 'medium'
    | 'small-heading'
    | 'small'
    | undefined;
}

export default function Span(props: Readonly<Props>): ReactElement {
  return <DesignSystem props={props} type="span" />;
}
