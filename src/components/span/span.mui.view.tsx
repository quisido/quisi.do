import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import useMuiSpan from './span.mui.hook';
import type Props from './types/props';

export default function MuiSpan({
  children,
  className,
  color: colorProps,
  element,
  size,
}: Readonly<Props>): ReactElement {
  const { color: colorState, fontSize } = useMuiSpan({
    color: colorProps,
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

  return (
    <Box display="inline" {...optionalProps}>
      {children}
    </Box>
  );
}
