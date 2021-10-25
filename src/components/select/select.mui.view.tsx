import Select from '@mui/material/Select';
import type { ReactElement } from 'react';
import mapComponentToPropMapper from '../../utils/map-component-to-prop-mapper';
import useMuiSelect from './select.mui.hook';
import MenuItem from './select.mui-menu-item';
import type Props from './types/props';

const mapMenuItemPropsToMenuItem = mapComponentToPropMapper(MenuItem);

export default function MuiSelect({
  onChange,
  options,
  value: selectValue,
}: Readonly<Props>): ReactElement {
  const { handleChange, menuItemProps } = useMuiSelect({
    onChange,
    options,
  });

  return (
    <Select onChange={handleChange} size="small" value={selectValue}>
      {menuItemProps.map(mapMenuItemPropsToMenuItem)}
    </Select>
  );
}
