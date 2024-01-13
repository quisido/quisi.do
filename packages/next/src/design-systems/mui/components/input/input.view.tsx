import MuiInput from '@mui/material/Input';
import { type FormEvent, type ReactElement } from 'react';
import { type Props } from '../../../../components/input.js';
import useEffectEvent from '../../../../hooks/use-effect-event.js';
import mapAutocompleteToString from '../../../../utils/map-autocomplete-to-string.js';

export default function Input({
  autoComplete: autoCompleteProp,
  onChange,
  placeholder,
  type,
  value,
}: Props): ReactElement {
  const autoCompleteState: string = mapAutocompleteToString(autoCompleteProp);

  return (
    <MuiInput
      autoComplete={autoCompleteState}
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
