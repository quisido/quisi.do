import Box from '@awsui/components-react/box';
import NumberFormat from 'number-format-react';
import { ReactElement } from 'react';
import Item from '../types/item';

export default function UniqueDownloads({
  uniqueDownloads,
}: Item): ReactElement {
  return (
    <Box float="right">
      <NumberFormat>{uniqueDownloads}</NumberFormat>
    </Box>
  );
}
