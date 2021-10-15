import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { ReactElement, ReactNode } from 'react';
import useMuiCheckbox from './checkbox.mui.hook';

interface Props {
  readonly checked: boolean;
  readonly children: ReactNode;
  readonly onChange: (checked: boolean) => void;
}

export default function MuiCheckbox({
  checked,
  children,
  onChange,
}: Props): ReactElement {
  const { handleChange } = useMuiCheckbox({ onChange });

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={children}
    />
  );
}
