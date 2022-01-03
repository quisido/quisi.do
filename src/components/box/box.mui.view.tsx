import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import useMuiBox from './box.mui.hook';
import type Props from './types/props';

export default function MuiBox({
  children,
  className,
  color: colorProps,
  element,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  size,
}: Readonly<Props>): ReactElement {
  const {
    color: colorState,
    fontSize,
    mb,
    ml,
    mr,
    mt,
  } = useMuiBox({
    color: colorProps,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    size,
  });

  const optionalProps: BoxProps = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }
  if (typeof colorState === 'string') {
    optionalProps.color = colorState;
  }
  if (typeof element === 'string') {
    optionalProps.component = element;
  }
  if (typeof fontSize !== 'undefined') {
    optionalProps.fontSize = fontSize;
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

  return (
    <Box margin={0} padding={0} {...optionalProps}>
      {children}
    </Box>
  );
}
