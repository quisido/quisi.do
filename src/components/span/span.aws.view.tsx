import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import useAwsSpan from './span.aws.hook';
import type Props from './types/props';

export default function AwsSpan({
  children,
  className,
  color,
  element,
  size,
}: Readonly<Props>): ReactElement {
  const { fontSize, variant } = useAwsSpan({
    color,
    element,
    size,
  });

  const optionalProps: BoxProps = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }
  if (typeof fontSize !== 'undefined') {
    optionalProps.fontSize = fontSize;
  }
  if (typeof variant === 'string') {
    optionalProps.variant = variant;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
