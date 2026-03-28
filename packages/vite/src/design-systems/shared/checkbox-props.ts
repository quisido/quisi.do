import type { DisabledOrReadOnly } from './disabled-or-readonly.js';

interface BaseCheckboxProps {
  readonly label: string;
  readonly onCheck: VoidFunction;
  readonly onUncheck: VoidFunction;
  /**
   * @default false
   */
  readonly required?: boolean | undefined;
  readonly value: boolean | 'mixed';
}

export type CheckboxProps = DisabledOrReadOnly<BaseCheckboxProps>;
