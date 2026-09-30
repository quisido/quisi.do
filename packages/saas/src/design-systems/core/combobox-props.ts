import { type DisabledOrReadOnlyProps } from './disabled-or-readonly-props.js';

interface Props {
  readonly label: string;
  readonly onChange: (value: string) => void;
  readonly options: readonly string[];
  readonly value: string;
}

export type ComboboxProps = DisabledOrReadOnlyProps & Props;
