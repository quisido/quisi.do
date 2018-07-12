import Chip, { type ChipProps } from '@mui/material/Chip';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/chip/index.js';
import optional from '../../../../utils/optional.js';

export default function MuiChip({ children, className }: Props): ReactElement {
  return (
    <Chip
      {...optional<ChipProps>('className', className)}
      color="default"
      label={<>{children}</>}
      size="small"
    />
  );
}
