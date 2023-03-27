import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
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
  if (isDefined(className)) {
    optionalProps.className = className;
  }
  if (isDefined(colorState)) {
    optionalProps.color = colorState;
  }
  if (isDefined(element)) {
    optionalProps.component = element;
  }
  if (isDefined(fontSize)) {
    optionalProps.fontSize = fontSize;
  }

  return (
    <Box display="inline" {...optionalProps}>
      {children}
    </Box>
  );
}
