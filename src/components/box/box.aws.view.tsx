import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import useAwsBox from './box.aws.hook';
import type Props from './types/props';

export default function AwsBox({
  children,
  className,
  element,
  fontSize: fontSizeProp,
  margin: marginProp,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: Readonly<Props>): ReactElement {
  const {
    fontSize: fontSizeState,
    margin: marginState,
    variant,
  } = useAwsBox({
    element,
    fontSize: fontSizeProp,
    margin: marginProp,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
  });

  const optionalProps: BoxProps = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }
  if (typeof fontSizeState !== 'undefined') {
    optionalProps.fontSize = fontSizeState;
  }
  if (typeof marginState !== 'undefined') {
    optionalProps.margin = marginState;
  }
  if (typeof variant === 'string') {
    optionalProps.variant = variant;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
