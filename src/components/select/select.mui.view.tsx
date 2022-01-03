import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import type { ReactElement } from 'react';
import mapComponentToPropMapper from '../../utils/map-component-to-prop-mapper';
import MenuItem from './components/mui-menu-item';
import useMuiSelect from './select.mui.hook';
import type Props from './types/props';

/**
 * The `Select` component should not have to have a `native` prop, but the
 *   `onChange` handler will not fire without it.
 */

let idNumber = 1;
const mapMenuItemPropsToMenuItem = mapComponentToPropMapper(MenuItem);

export default function MuiSelect({
  label,
  onChange,
  options,
  value,
}: Readonly<Props>): ReactElement {
  const { handleChange, menuItemProps } = useMuiSelect({
    onChange,
    options,
  });

  idNumber++;
  const idString = `select-${idNumber}`;
  return (
    <FormControl fullWidth>
      <InputLabel id={idString}>{label}</InputLabel>
      <Select
        label={label}
        labelId={idString}
        native
        onChange={handleChange}
        size="small"
        value={value}
      >
        {menuItemProps.map(mapMenuItemPropsToMenuItem)}
      </Select>
    </FormControl>
  );
}
