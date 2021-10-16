import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { ReactElement } from 'react';
import type SelectOption from '../../types/select-option';
import useMuiSelect from './select.mui.hook';
import type Props from './select.type.props';

export default function MuiSelect({
  onChange,
  options,
  value: selectValue,
}: Props): ReactElement {
  const { handleChange } = useMuiSelect({ onChange });

  return (
    <Select onChange={handleChange} value={selectValue}>
      {options.map(
        ({
          label,
          value: optionValue,
        }: Readonly<SelectOption>): ReactElement => (
          <MenuItem key={optionValue} value={optionValue}>
            {label}
          </MenuItem>
        ),
      )}
    </Select>
  );
}
