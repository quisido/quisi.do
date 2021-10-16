import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import type Props from './color.type.props';
import mapColorToMuiColor from './color.util.map-color-to-mui-color';

export default function MuiColor({
  children,
  value,
}: Readonly<Props>): ReactElement {
  return <Box sx={{ color: mapColorToMuiColor(value) }}>{children}</Box>;
}
