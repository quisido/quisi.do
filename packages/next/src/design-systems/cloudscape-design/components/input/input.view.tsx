import CloudscapeInput, {
  type InputProps,
} from '@cloudscape-design/components/input';
import { type NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
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
    <CloudscapeInput
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
