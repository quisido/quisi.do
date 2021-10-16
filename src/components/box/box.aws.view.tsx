import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import useAwsBox from './box.aws.hook';
import type Props from './box.type.props';

export default function AwsBox({
  children,
  className,
  element,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
}: Readonly<Props>): ReactElement {
  const { margin } = useAwsBox({
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
  });

  const optionalProps: BoxProps = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }
  if (typeof margin !== 'undefined') {
    optionalProps.margin = margin;
  }
  if (typeof element === 'string') {
    optionalProps.variant = element;
  }

  return <Box {...optionalProps}>{children}</Box>;
}
