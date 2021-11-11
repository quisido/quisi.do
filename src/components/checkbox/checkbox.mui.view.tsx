import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { ReactElement } from 'react';
import useMuiCheckbox from './checkbox.mui.hook';
import type Props from './types/props';

export default function MuiCheckbox({
  checked,
  children,
  onChange,
}: Readonly<Props>): ReactElement {
  const { handleChange } = useMuiCheckbox({ onChange });

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={children}
    />
  );
}
