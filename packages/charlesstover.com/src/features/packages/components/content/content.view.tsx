import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Table from '../../../../components/table';
import Description from '../../components/description';
import type Item from '../../types/packages-item';
import usePackagesContents from './content.hook';

export default function PackagesContent(): ReactElement {
  const {
    columns,
    filter,
    filterPlaceholder,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSort,
    handleVisibleColumnsChange,
    loading,
    page,
    rows,
    rowsCount,
    rowsPerPage,
    rowsPerPageOptions,
    sortAscending,
    sortColumnIndex,
    visibleColumnIndices,
  } = usePackagesContents();

  return (
    <Table<Item>
      Description={Description}
      columns={columns}
      filter={filter}
      filterPlaceholder={filterPlaceholder}
      header={<I18n>Packages</I18n>}
      loading={loading}
      onFilterChange={handleFilterChange}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSort={handleSort}
      onVisibleColumnsChange={handleVisibleColumnsChange}
      page={page}
      rows={rows}
      rowsCount={rowsCount}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      sortAscending={sortAscending}
      sortColumnIndex={sortColumnIndex}
      visibleColumnIndices={visibleColumnIndices}
    />
  );
}
