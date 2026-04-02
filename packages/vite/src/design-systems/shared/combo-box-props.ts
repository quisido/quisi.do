import type { DisabledOrReadOnly } from './disabled-or-readonly.js';

interface BaseComboBoxProps {
  readonly label: string;
  readonly onChange: (value: string) => void;
  readonly options: readonly string[];
  readonly value: string;
}

export type ComboBoxProps = DisabledOrReadOnly<BaseComboBoxProps>;
