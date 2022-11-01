import type { BoxProps } from '@cloudscape-design/components/box';
import Box from '@cloudscape-design/components/box';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
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
