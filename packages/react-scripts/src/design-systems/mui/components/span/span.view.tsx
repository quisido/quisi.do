import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/span';
import useSpan from './span.hook';

export default function MuiSpan({
  children,
  className,
  color: colorProps,
  element,
  size,
}: Readonly<Props>): ReactElement {
  const { color: colorState, fontSize } = useSpan({
    color: colorProps,
    size,
  });

  const optionalProps: BoxProps = {};
  if (typeof className !== 'undefined') {
    optionalProps.className = className;
  }
  if (typeof colorState !== 'undefined') {
    optionalProps.color = colorState;
  }
  if (typeof element !== 'undefined') {
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
