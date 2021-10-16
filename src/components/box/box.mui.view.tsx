import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import useMuiBox from './box.mui.hook';
import type Props from './box.type.props';

export default function MuiBox({
  children,
  className,
  marginTop,
}: Readonly<Props>): ReactElement {
  const { mt } = useMuiBox({ marginTop });

  const optionalProps: BoxProps = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }
  if (typeof mt !== 'undefined') {
    optionalProps.mt = mt;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
