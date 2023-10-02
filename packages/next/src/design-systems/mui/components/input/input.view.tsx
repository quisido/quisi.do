import MuiInput from '@mui/material/Input';
import { FormEvent, ReactElement } from 'react';
import type { Props } from '../../../../components/input';
import useEffectEvent from '../../../../hooks/use-effect-event';

export default function Input({
  onChange,
  placeholder,
  type,
  value,
}: Props): ReactElement {
  return (
    <MuiInput
      onChange={useEffectEvent(
        (e: FormEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
          onChange(e.currentTarget.value);
        },
      )}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}
