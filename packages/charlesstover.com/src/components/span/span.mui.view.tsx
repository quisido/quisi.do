import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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
  if (findDefined(className)) {
    optionalProps.className = className;
  }
  if (findDefined(colorState)) {
    optionalProps.color = colorState;
  }
  if (findDefined(element)) {
    optionalProps.component = element;
  }
  if (findDefined(fontSize)) {
    optionalProps.fontSize = fontSize;
  }

  return (
    <Box display="inline" {...optionalProps}>
      {children}
    </Box>
  );
}
