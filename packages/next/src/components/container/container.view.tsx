import type { ReactElement, ReactNode } from 'react';
import DesignSystem from '../design-system';

export interface Props {
  readonly actions?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly footer?: ReactNode | undefined;
  readonly header: ReactNode;
  readonly headerClassName?: string | undefined;
  readonly marginTop?: 'large' | 'medium' | 'small' | undefined;
}

export default function Container(props: Readonly<Props>): ReactElement {
  return <DesignSystem props={props} type="container" />;
}
