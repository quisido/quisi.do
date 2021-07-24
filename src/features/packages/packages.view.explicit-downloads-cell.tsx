import Box from '@awsui/components-react/box';
import NumberFormat from 'number-format-react';
import type { ReactElement } from 'react';
import type Item from './packages.type.item';

export default function PackagesExplicitDownloadsCell({
  explicitDownloads,
}: Item): ReactElement {
  return (
    <Box float="right">
      <NumberFormat>{explicitDownloads}</NumberFormat>
    </Box>
  );
}
