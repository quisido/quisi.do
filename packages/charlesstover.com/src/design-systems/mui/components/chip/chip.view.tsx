import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/chip';

export default function MuiChip({
  children,
  className,
}: Readonly<Props>): ReactElement {
  const optionalProps: Pick<ChipProps, 'className'> = {};
  if (typeof className !== 'undefined') {
    optionalProps.className = className;
  }

  return (
    <Chip
      color="default"
      label={<>{children}</>}
      size="small"
      {...optionalProps}
    />
  );
}
