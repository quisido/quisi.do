import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
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
  if (filterByDefined(className)) {
    optionalProps.className = className;
  }
  if (filterByDefined(colorState)) {
    optionalProps.color = colorState;
  }
  if (filterByDefined(element)) {
    optionalProps.component = element;
  }
  if (filterByDefined(fontSize)) {
    optionalProps.fontSize = fontSize;
  }

  return (
    <Box display="inline" {...optionalProps}>
      {children}
    </Box>
  );
}
