import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
import useAwsSpan from './span.aws.hook';
import type Props from './types/props';

export default function AwsSpan({
  children,
  className,
  color: colorProp,
  element,
  size,
}: Readonly<Props>): ReactElement {
  const {
    color: colorState,
    fontSize,
    variant,
  } = useAwsSpan({
    color: colorProp,
    element,
    size,
  });

  const optionalProps: BoxProps = {};
  if (isDefined(className)) {
    optionalProps.className = className;
  }
  if (isDefined(colorState)) {
    optionalProps.color = colorState;
  }
  if (isDefined(fontSize)) {
    optionalProps.fontSize = fontSize;
  }
  if (isDefined(variant)) {
    optionalProps.variant = variant;
  }

  return (
    <Box display="inline" {...optionalProps}>
      {children}
    </Box>
  );
}
