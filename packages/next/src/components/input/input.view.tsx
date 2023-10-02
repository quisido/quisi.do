import { FormEvent, ReactElement } from 'react';
import DesignSystem from '../design-system';

export interface Props {
  readonly onChange: (value: string) => void;
  readonly placeholder: string;
  readonly type?: 'password' | 'text' | undefined;
  readonly value: string;
}

function Fallback({ onChange, placeholder, type, value }: Props): ReactElement {
  return (
    <input
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
