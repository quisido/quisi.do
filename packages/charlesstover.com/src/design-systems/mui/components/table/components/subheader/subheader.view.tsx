import type { ReactElement } from 'react';
import Span from '../../../span';

interface Props {
  readonly children: string | undefined;
}

export default function MuiTableSubheader({
  children,
}: Readonly<Props>): ReactElement | null {
  if (typeof children === 'undefined') {
    return null;
  }

  return <Span size="small">{children}</Span>;
}
