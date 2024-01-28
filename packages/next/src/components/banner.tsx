import { type ReactElement, type ReactNode } from 'react';
import DesignSystem from './design-system/index.js';

export interface Props {
  readonly children: ReactNode;
  readonly icon?: string | undefined;
  readonly onDismiss?: VoidFunction | undefined;
  readonly type: 'error' | 'info' | 'success' | 'warning';
}

export default function Banner(props: Props): ReactElement {
  return <DesignSystem props={props} type="banner" />;
}
