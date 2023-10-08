import type { CheckboxProps } from '@cloudscape-design/components/checkbox';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
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

export default function useCloudscapeDesignCheckbox({
  onChange,
}: Props): State {
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
