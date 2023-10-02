import AwsuiInput, { type InputProps } from '@awsui/components-react/input';
import { type NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import { ReactElement } from 'react';
import type { Props } from '../../../../components/input';
import useEffectEvent from '../../../../hooks/use-effect-event';

export default function Input({
  onChange,
  placeholder,
  type,
  value,
}: Props): ReactElement {
  return (
    <AwsuiInput
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
