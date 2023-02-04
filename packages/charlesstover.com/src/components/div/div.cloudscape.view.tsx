import type { BoxProps } from '@cloudscape-design/components/box';
import Box from '@cloudscape-design/components/box';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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
  if (findDefined(classNameState)) {
    optionalProps.className = classNameState;
  }
  if (findDefined(displayState)) {
    optionalProps.display = displayState;
  }
  if (findDefined(float)) {
    optionalProps.float = float;
  }
  if (findDefined(marginState)) {
    optionalProps.margin = marginState;
  }
  if (findDefined(textAlign)) {
    optionalProps.textAlign = textAlign;
  }
  if (findDefined(variant)) {
    optionalProps.variant = variant;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
