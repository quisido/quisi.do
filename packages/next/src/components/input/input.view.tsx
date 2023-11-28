import { type FormEvent, type ReactElement } from 'react';
import DesignSystem from '../design-system';
import mapAutoCompleteToString from '../../utils/map-autocomplete-to-string';

export interface Props {
  readonly autoComplete: Set<AutoFill> | false;
  readonly onChange: (value: string) => void;
  readonly placeholder: string;
  readonly type?: 'password' | 'text' | undefined;
  readonly value: string;
}

function Fallback({
  autoComplete: autoCompleteProp,
  onChange,
  placeholder,
  type,
  value,
}: Props): ReactElement {
  const autoCompleteState: string = mapAutoCompleteToString(autoCompleteProp);
  return (
    <input
      autoComplete={autoCompleteState}
      placeholder={placeholder}
      type={type}
      value={value}
      onInput={(e: FormEvent<HTMLInputElement>): void => {
        onChange(e.currentTarget.value);
      }}
    />
  );
}

export default function Input(props: Props): ReactElement {
  return <DesignSystem Fallback={Fallback} props={props} type="input" />;
}
