import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
import type Props from './types/props';

export default function MuiChip({
  children,
  className,
}: Readonly<Props>): ReactElement {
  const optionalProps: Pick<ChipProps, 'className'> = {};
  if (isDefined(className)) {
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
