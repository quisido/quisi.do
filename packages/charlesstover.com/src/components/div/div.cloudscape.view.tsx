import type { BoxProps } from '@cloudscape-design/components/box';
import Box from '@cloudscape-design/components/box';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import useCloudscapeDiv from './div.cloudscape.hook';
import type Props from './types/props';

export default function CloudscapeDiv({
  children,
  className: classNameProp,
  display: displayProp,
  element,
  flexDirection,
  flexWrap,
  float,
  justifyContent,
  margin: marginProp,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  textAlign,
}: Readonly<Props>): ReactElement {
  const {
    className: classNameState,
    display: displayState,
    margin: marginState,
    variant,
  } = useCloudscapeDiv({
    className: classNameProp,
    display: displayProp,
    element,
    flexDirection,
    flexWrap,
    justifyContent,
    margin: marginProp,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
  });

  const optionalProps: BoxProps = {};
  if (filterByDefined(classNameState)) {
    optionalProps.className = classNameState;
  }
  if (filterByDefined(displayState)) {
    optionalProps.display = displayState;
  }
  if (filterByDefined(float)) {
    optionalProps.float = float;
  }
  if (filterByDefined(marginState)) {
    optionalProps.margin = marginState;
  }
  if (filterByDefined(textAlign)) {
    optionalProps.textAlign = textAlign;
  }
  if (filterByDefined(variant)) {
    optionalProps.variant = variant;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
