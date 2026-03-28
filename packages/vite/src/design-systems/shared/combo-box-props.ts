import type { ReactNode } from 'react';
import type { DisabledOrReadOnly } from './disabled-or-readonly.js';

interface BaseComboBoxProps {
  readonly children: ReactNode;
  readonly label: string;
}

export type ComboBoxProps = DisabledOrReadOnly<BaseComboBoxProps>;
