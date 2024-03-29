import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/select.js';
import mapComponentToPropMapper from '../../../../utils/map-component-to-prop-mapper.js';
import MenuItem from './components/menu-item/index.js';
import useSelect from './select.hook.js';

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
}: Props): ReactElement {
  const { handleChange, id, menuItemProps } = useSelect({
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
