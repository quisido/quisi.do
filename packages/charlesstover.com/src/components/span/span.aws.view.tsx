import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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
  if (findDefined(className)) {
    optionalProps.className = className;
  }
  if (findDefined(colorState)) {
    optionalProps.color = colorState;
  }
  if (findDefined(fontSize)) {
    optionalProps.fontSize = fontSize;
  }
  if (findDefined(variant)) {
    optionalProps.variant = variant;
  }

  return (
    <Box display="inline" {...optionalProps}>
      {children}
    </Box>
  );
}
