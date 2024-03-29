import { type ReactElement, type ReactNode } from 'react';
import DesignSystem from './design-system/index.js';

export interface Props {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly title?: ReactNode | undefined;
}

export default function Chip(props: Props): ReactElement {
  return <DesignSystem props={props} type="chip" />;
}
