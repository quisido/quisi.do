import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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

  if (!findDefined(classNameState)) {
    return <Box {...optionalProps}>{children}</Box>;
  }

  return (
    <Box {...optionalProps}>
      <div className={classNameState}>{children}</div>
    </Box>
  );
}
