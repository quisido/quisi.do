import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import useMuiBox from './box.mui.hook';
import type Props from './box.type.props';

export default function MuiBox({
  children,
  className,
  element,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
}: Readonly<Props>): ReactElement {
  const { mb, ml, mr, mt } = useMuiBox({
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
  });

  const optionalProps: BoxProps = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }
  if (typeof element === 'string') {
    optionalProps.component = element;
  }
  if (typeof mb !== 'undefined') {
    optionalProps.mb = mb;
  }
  if (typeof ml !== 'undefined') {
    optionalProps.ml = ml;
  }
  if (typeof mr !== 'undefined') {
    optionalProps.mr = mr;
  }
  if (typeof mt !== 'undefined') {
    optionalProps.mt = mt;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
