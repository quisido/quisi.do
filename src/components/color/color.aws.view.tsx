import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import type Props from './color.type.props';
import mapColorToAwsColor from './color.util.map-color-to-aws-color';

export default function AwsColor({ children, value }: Props): ReactElement {
  return (
    <Box color={mapColorToAwsColor(value)} display="inline">
      {children}
    </Box>
  );
}
