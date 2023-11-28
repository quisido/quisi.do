import CloudscapeInput, {
  type InputProps,
} from '@cloudscape-design/components/input';
import { type NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/input';
import useEffectEvent from '../../../../hooks/use-effect-event';
import mapAutoCompleteToString from '../../../../utils/map-autocomplete-to-string';

export default function Input({
  autoComplete: autoCompleteProp,
  onChange,
  placeholder,
  type,
  value,
}: Props): ReactElement {
  const autoCompleteState: string = mapAutoCompleteToString(autoCompleteProp);

  return (
    <CloudscapeInput
      autoComplete={autoCompleteState}
      onChange={useEffectEvent(
        (e: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
          onChange(e.detail.value);
        },
      )}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}
