import type { BoxProps } from '@cloudscape-design/components/box';
import Box from '@cloudscape-design/components/box';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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
