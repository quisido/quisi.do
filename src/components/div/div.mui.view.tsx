import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import useMuiDiv from './div.mui.hook';
import type Props from './types/props';

export default function MuiDiv({
  children,
  className,
  element,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  textAlign,
}: Readonly<Props>): ReactElement {
  const { mb, ml, mr, mt } = useMuiDiv({
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
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

  return (
    <Box margin={0} padding={0} textAlign={textAlign} {...optionalProps}>
      {children}
    </Box>
  );
}
