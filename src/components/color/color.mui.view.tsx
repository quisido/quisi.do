import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import type { ReactElement } from 'react';
import useMuiColor from './color.mui.hook';
import type Props from './types/props';

export default function MuiColor({
  children,
  value,
}: Readonly<Props>): ReactElement {
  const sx: SxProps<Theme> = useMuiColor(value);

  return <Box sx={sx}>{children}</Box>;
}
