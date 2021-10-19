import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import useAwsBox from './box.aws.hook';
import type Props from './box.type.props';

export default function AwsBox({
  children,
  className,
  element,
  margin: marginProp,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: Readonly<Props>): ReactElement {
  const { margin: marginState, variant } = useAwsBox({
    element,
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
  if (typeof marginState !== 'undefined') {
    optionalProps.margin = marginState;
  }
  if (typeof variant === 'string') {
    optionalProps.variant = variant;
  }

  return <Box {...optionalProps}>{children}</Box>;
}