import type { ReactElement } from 'react';
import type { DataGridLayoutProps } from '../shared/data-grid-layout-props.js';
import Main from '../template/main.js';
import Region from '../template/region.js';
import Toolbar from '../template/toolbar.js';

/**
 *   The `DataGridLayout` is a page dominated by a complex data table, complete
 * with optional bulk action controls, filtering, and pagination.
 *   Actions and filters are rendered within a toolbar landmark, enabling
 * assistive technologies to navigate the controls separately from the data.
 * Pagination is presented as a labeled navigation region.
 */
export default function DataGridLayout({
  actions,
  children,
  filters,
  label,
  pagination,
}: DataGridLayoutProps): ReactElement {
  return (
    <Main label={label}>
      {(actions !== undefined || filters !== undefined) && (
        <Toolbar label="Data controls">
          {filters}
          {actions}
        </Toolbar>
      )}
      {children}
      {pagination !== undefined && (
        <Region label="Pagination">{pagination}</Region>
      )}
    </Main>
  );
}
