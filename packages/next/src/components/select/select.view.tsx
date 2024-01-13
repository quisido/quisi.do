import { type ReactElement, type ReactNode } from 'react';
import type SelectOption from '../../types/select-option.js';
import DesignSystem from '../design-system/index.js';

export interface Props {
  readonly disabled?: boolean | undefined;
  readonly label?: ReactNode;
  readonly labelDirection?: 'column' | 'row' | undefined;
  readonly onChange: (value: string | undefined) => void;
  readonly options: readonly Readonly<SelectOption>[];
  readonly value: string | undefined;
}

export default function Select(props: Props): ReactElement {
  return <DesignSystem props={props} type="select" />;
}
