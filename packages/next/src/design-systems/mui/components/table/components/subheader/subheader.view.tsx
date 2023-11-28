import { type PropsWithChildren, type ReactElement } from 'react';
import Span from '../../../span';

export default function MuiTableSubheader({
  children,
}: Readonly<PropsWithChildren>): ReactElement | null {
  if (typeof children === 'undefined') {
    return null;
  }

  return <Span size="small">{children}</Span>;
}
