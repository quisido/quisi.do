import { type ReactElement, type ReactNode } from 'react';
import DesignSystem from './design-system/index.js';

export interface Props {
  readonly actions?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly header?: ReactNode | undefined;
}

export default function Section(props: Props): ReactElement {
  return <DesignSystem props={props} type="section" />;
}
