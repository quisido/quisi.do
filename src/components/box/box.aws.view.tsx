import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import useAwsBox from './box.aws.hook';
import type Props from './types/props';

export default function AwsBox({
  children,
  className,
  color,
  element,
  margin: marginProp,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  size,
}: Readonly<Props>): ReactElement {
  const {
    fontSize,
    margin: marginState,
    variant,
  } = useAwsBox({
    color,
    element,
    margin: marginProp,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    size,
  });

  const optionalProps: BoxProps = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }
  if (typeof fontSize !== 'undefined') {
    optionalProps.fontSize = fontSize;
  }
  if (typeof marginState !== 'undefined') {
    optionalProps.margin = marginState;
  }
  if (typeof variant === 'string') {
    optionalProps.variant = variant;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
