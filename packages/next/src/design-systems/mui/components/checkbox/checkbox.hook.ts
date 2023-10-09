import { type ChangeEvent, useCallback } from 'react';

interface Props {
  readonly onChange: (checked: boolean) => void;
}

interface State {
  readonly handleChange: (
    event: Readonly<ChangeEvent<Readonly<HTMLInputElement>>>,
  ) => void;
}

export default function useMuiCheckbox({ onChange }: Props): State {
  return {
    handleChange: useCallback(
      (e: Readonly<ChangeEvent<Readonly<HTMLInputElement>>>): void => {
        onChange(e.target.checked);
      },
      [onChange],
    ),
  };
}
