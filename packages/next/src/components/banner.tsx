import { type ReactElement, type ReactNode } from 'react';
import DesignSystem from './design-system';

export interface Props {
  readonly children: ReactNode;
  readonly onDismiss?: VoidFunction | undefined;
}

export default function Banner(props: Props): ReactElement {
  return <DesignSystem props={props} type="banner" />;
}
