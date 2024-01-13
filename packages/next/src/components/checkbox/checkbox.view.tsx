import { type ReactElement, type ReactNode } from 'react';
import DesignSystem from '../../components/design-system/index.js';

export interface Props {
  readonly checked: boolean;
  readonly children: ReactNode;
  readonly onChange: (checked: boolean) => void;
}

export default function Checkbox(props: Props): ReactElement {
  return <DesignSystem props={props} type="checkbox" />;
}
