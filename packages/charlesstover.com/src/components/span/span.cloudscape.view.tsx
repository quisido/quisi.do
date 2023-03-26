import type { BoxProps } from '@cloudscape-design/components/box';
import Box from '@cloudscape-design/components/box';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
import useCloudscapeSpan from './span.cloudscape.hook';
import type Props from './types/props';

export default function CloudscapeSpan({
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
  } = useCloudscapeSpan({
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
