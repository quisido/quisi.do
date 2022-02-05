import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
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
  if (filterByDefined(className)) {
    optionalProps.className = className;
  }
  if (filterByDefined(colorState)) {
    optionalProps.color = colorState;
  }
  if (filterByDefined(fontSize)) {
    optionalProps.fontSize = fontSize;
  }
  if (filterByDefined(variant)) {
    optionalProps.variant = variant;
  }

  return (
    <Box display="inline" {...optionalProps}>
      {children}
    </Box>
  );
}
