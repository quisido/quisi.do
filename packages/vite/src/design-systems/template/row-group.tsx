import type { ReactElement } from 'react';
import type { RowGroupProps } from '../shared/row-group-props.js';

/**
 *   A `RowGroup` component contains one or more tabular rows. It is the
 * structural equivalent of a table's `thead`, `tbody`, or `tfoot`.
 */
export default function RowGroup({
  children,
  label,
  section = 'body',
}: RowGroupProps): ReactElement {
  switch (section) {
    case 'footer':
      return <tfoot aria-label={label}>{children}</tfoot>;
    case 'head':
      return <thead aria-label={label}>{children}</thead>;
    default:
      return <tbody aria-label={label}>{children}</tbody>;
  }
}
