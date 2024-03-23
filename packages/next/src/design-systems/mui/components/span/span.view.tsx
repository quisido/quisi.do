import Box, { type BoxProps } from '@mui/material/Box';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/span.js';
import optional from '../../../../utils/optional.js';
import useSpan from './span.hook.js';

export default function MuiSpan({
  children,
  className,
  color: colorProps,
  element,
  size,
}: Props): ReactElement {
  const { color: colorState, fontSize } = useSpan({
    color: colorProps,
    size,
  });

  return (
    <Box
      {...optional<BoxProps>('className', className)}
      {...optional<BoxProps>('color', colorState)}
      {...optional<BoxProps>('component', element)}
      display="inline"
      {...optional<BoxProps>('fontSize', fontSize)}
    >
      {children}
    </Box>
  );
}
