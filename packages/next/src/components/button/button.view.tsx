import type { ReactElement, ReactNode } from 'react';
import DesignSystem from '../design-system';

export interface Props {
  /**
   * The category provides context of the event. It essentially acts as a stack
   *   trace.
   *
   * Given `src\/*\/*\/*\/*\.tsx?`, the category would probably be `$1/$2/$4`.
   *
   * Use your best judgment if something else is more applicable.
   */
  readonly category: string;
  readonly children: ReactNode;
  readonly href?: string | undefined;
  readonly onClick?: VoidFunction | undefined;
  readonly variant: 'primary';
}

export default function Button(props: Props): ReactElement {
  return <DesignSystem props={props} type="button" />;
}
