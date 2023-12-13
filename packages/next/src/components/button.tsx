import { type ReactElement, type ReactNode } from 'react';
import DesignSystem from './design-system';

export interface Props {
  readonly children: ReactNode;
  /**
   *   The feature provides context of the event. It essentially acts as a stack
   * trace.
   */
  readonly feature: string;
  readonly href?: string | undefined;
  readonly onClick?: VoidFunction | undefined;
  readonly variant: 'primary';
}

export default function Button(props: Props): ReactElement {
  return <DesignSystem props={props} type="button" />;
}
