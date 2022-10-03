import type { ReactNode } from 'react';
import type SelectOption from '../../../types/select-option';

export default interface Props {
  readonly disabled?: boolean | undefined;
  readonly label?: ReactNode | undefined;
  readonly labelDirection?: 'column' | 'row' | undefined;
  readonly onChange: (value: string | undefined) => void;
  readonly options: readonly Readonly<SelectOption>[];
  readonly value: string | undefined;
}