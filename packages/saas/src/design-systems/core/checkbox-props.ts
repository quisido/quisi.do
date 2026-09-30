import { type DisabledOrReadOnlyProps } from './disabled-or-readonly-props.js';

interface Props {
  readonly label: string;
  readonly onCheck: VoidFunction;
  readonly onUncheck: VoidFunction;
  /**
   * @default false
   */
  readonly required?: boolean | undefined;
  readonly value: boolean | 'mixed';
}

export type CheckboxProps = DisabledOrReadOnlyProps & Props;
