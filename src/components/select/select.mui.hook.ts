import type { SelectChangeEvent } from '@mui/material/Select';
import { useCallback } from 'react';

interface Props {
  readonly onChange: (value: string | undefined) => void;
}

interface State {
  readonly handleChange: (event: SelectChangeEvent<string | undefined>) => void;
}

export default function useMuiSelect({ onChange }: Readonly<Props>): State {
  return {
    handleChange: useCallback(
      (e: Readonly<SelectChangeEvent<string | undefined>>) => {
        onChange(e.target.value);
      },
      [onChange],
    ),
  };
}
