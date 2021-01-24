import Box from '@awsui/components-react/box';
import NumberFormat from 'number-format-react';
import { ReactElement } from 'react';
import Item from '../types/item';

export default function ExplicitDownloads({
  explicitDownloads,
}: Item): ReactElement {
  return (
    <Box float="right">
      <NumberFormat>{explicitDownloads}</NumberFormat>
    </Box>
  );
}
