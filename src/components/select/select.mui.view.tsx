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

const mapMenuItemPropsToMenuItem = mapComponentToPropMapper(MenuItem);

export default function MuiSelect({
  disabled = false,
  label,
  onChange,
  options,
  value,
}: Readonly<Props>): ReactElement {
  const { handleChange, id, menuItemProps } = useMuiSelect({
    onChange,
    options,
  });

  return (
    <FormControl disabled={disabled} fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        disabled={disabled}
        label={label}
        labelId={id}
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
