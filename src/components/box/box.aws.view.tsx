import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import useAwsBox from './box.aws.hook';
import type Props from './box.type.props';

export default function AwsBox({
  children,
  className,
  marginTop,
}: Readonly<Props>): ReactElement {
  const { margin } = useAwsBox({ marginTop });

  const optionalProps: BoxProps = {};
  if (typeof className === 'string') {
    optionalProps.className = className;
  }

  return (
    <Box {...optionalProps} margin={margin}>
      {children}
    </Box>
  );
}
