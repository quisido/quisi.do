import type { ReactElement, ReactNode } from 'react';
import type SelectOption from '../../types/select-option';
import DesignSystem from '../design-system';

export interface Props {
  readonly disabled?: boolean | undefined;
  readonly label?: ReactNode;
  readonly labelDirection?: 'column' | 'row' | undefined;
  readonly onChange: (value: string | undefined) => void;
  readonly options: readonly Readonly<SelectOption>[];
  readonly value: string | undefined;
}

export default function Select(props: Readonly<Props>): ReactElement {
  return <DesignSystem props={props} type="select" />;
}
