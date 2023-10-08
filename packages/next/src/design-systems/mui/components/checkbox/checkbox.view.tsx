import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/checkbox';
import useCheckbox from './checkbox.hook';

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
