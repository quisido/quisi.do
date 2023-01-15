import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import useAwsDiv from './div.aws.hook';
import type Props from './types/props';

export default function AwsDiv({
  children,
  className: classNameProp,
  display: displayProp,
  element,
  flexDirection,
  flexWrap,
  float,
  margin: marginProp,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  justifyContent,
  textAlign,
}: Readonly<Props>): ReactElement {
  const {
    className: classNameState,
    display: displayState,
    margin: marginState,
    variant,
  } = useAwsDiv({
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

  if (!filterByDefined(classNameState)) {
    return <Box {...optionalProps}>{children}</Box>;
  }

  return (
    <Box {...optionalProps}>
      <div className={classNameState}>{children}</div>
    </Box>
  );
}
