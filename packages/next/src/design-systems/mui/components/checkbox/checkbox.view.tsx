import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/checkbox.js';
import useCheckbox from './checkbox.hook.js';

export default function MuiCheckbox({
  checked,
  children,
  onChange,
}: Props): ReactElement {
  const { handleChange } = useCheckbox({ onChange });

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={<>{children}</>}
    />
  );
}
