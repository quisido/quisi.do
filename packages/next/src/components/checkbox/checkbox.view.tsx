import type { ReactElement, ReactNode } from 'react';
import DesignSystem from '../../components/design-system';

export interface Props {
  readonly checked: boolean;
  readonly children: ReactNode;
  readonly onChange: (checked: boolean) => void;
}

export default function Checkbox(props: Readonly<Props>): ReactElement {
  return <DesignSystem props={props} type="checkbox" />;
}
