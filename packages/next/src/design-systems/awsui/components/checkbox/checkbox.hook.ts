import type { CheckboxProps } from '@awsui/components-react/checkbox';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import { useCallback } from 'react';

interface Props {
  readonly onChange: (checked: boolean) => void;
}

interface State {
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<CheckboxProps.ChangeDetail>>
    >,
  ) => void;
}

export default function useAwsuiCheckbox({ onChange }: Props): State {
  return {
    handleChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<CheckboxProps.ChangeDetail>>
        >,
      ): void => {
        onChange(e.detail.checked);
      },
      [onChange],
    ),
  };
}
