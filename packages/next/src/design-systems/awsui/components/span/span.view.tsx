import Box, type { BoxProps } from '@awsui/components-react/box';
import  { type ReactElement } from 'react';
import  { type Props } from '../../../../components/span';
import useSpan from './span.hook';

export default function AwsuiSpan({
  children,
  className,
  color: colorProp,
  element,
  size,
}: Props): ReactElement {
  const {
    color: colorState,
    fontSize,
    variant,
  } = useSpan({
    color: colorProp,
    element,
    size,
  });

  const optionalProps: BoxProps = {};
  if (typeof className !== 'undefined') {
    optionalProps.className = className;
  }

  if (typeof colorState !== 'undefined') {
    optionalProps.color = colorState;
  }

  if (typeof fontSize !== 'undefined') {
    optionalProps.fontSize = fontSize;
  }

  if (typeof variant !== 'undefined') {
    optionalProps.variant = variant;
  }

  return (
    <Box display="inline" {...optionalProps}>
      {children}
    </Box>
  );
}
