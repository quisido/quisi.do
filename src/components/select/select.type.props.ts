import type SelectOption from '../../types/select-option';

export default interface Props {
  readonly onChange: (value: string | undefined) => void;
  readonly options: readonly Readonly<SelectOption>[];
  readonly value: string | undefined;
}