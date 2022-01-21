import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import useAwsDiv from './div.aws.hook';
import type Props from './types/props';

export default function AwsDiv({
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
  textAlign,
}: Readonly<Props>): ReactElement {
  const { margin: marginState, variant } = useAwsDiv({
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
  if (typeof textAlign === 'string') {
    optionalProps.textAlign = textAlign;
  }
  if (typeof variant === 'string') {
    optionalProps.variant = variant;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
