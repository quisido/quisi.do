import type { ReactElement } from 'react';
import type { RowHeaderProps } from '../shared/row-header-props.js';

/**
 *   A `RowHeader` component identifies a cell as header information for a row
 * in a `Table`, `Grid`, or `TreeGrid`.
 */
export default function RowHeader({ children }: RowHeaderProps): ReactElement {
  return <th scope="row">{children}</th>;
}
