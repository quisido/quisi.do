import CollectionPreferences from '@awsui/components-react/collection-preferences';
import Header from '@awsui/components-react/header';
import Pagination from '@awsui/components-react/pagination';
import type { TableProps } from '@awsui/components-react/table';
import Table from '@awsui/components-react/table';
import type { TextFilterProps } from '@awsui/components-react/text-filter';
import TextFilter from '@awsui/components-react/text-filter';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
import useAwsTable from './table.aws.hook';
import type Props from './types/props';

export default function AwsTable<Item extends Record<string, unknown>>({
  Description,
  columns,
  filter,
  filterPlaceholder,
  header,
  loading,
  onFilterChange,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  onVisibleColumnsChange,
  page,
  rows,
  rowsCount,
  rowsPerPage,
  rowsPerPageOptions,
  sortAscending,
  sortColumnIndex,
  visibleColumnIndices,
}: Readonly<Props<Item>>): ReactElement {
  const {
    DescriptionPortal,
    cancelLabel,
    collectionPreferencesTitle,
    columnDefinitions,
    confirmLabel,
    countText,
    filteringAriaLabel,
    handleCollectionPreferencesConfirm,
    handlePaginationChange,
    handleSortingChange,
    handleTextFilterChange,
    pageSizePreference,
    pagesCount,
    paginationAriaLabels,
    preferences,
    ref,
    sortingColumn,
    sortingDescending,
    visibleContent,
    visibleContentPreference,
    wrapLines,
    wrapLinesPreference,
  } = useAwsTable({
    Description,
    columns,
    onFilterChange,
    onPageChange,
    onRowsPerPageChange,
    onSort,
    onVisibleColumnsChange,
    rows,
    rowsCount,
    rowsPerPage,
    rowsPerPageOptions,
    sortAscending,
    sortColumnIndex,
    visibleColumnIndices,
  });

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalTableProps: Pick<
    TableProps<Item>,
    | 'loadingText'
    | 'sortingColumn'
    | 'sortingDescending'
    | 'visibleColumns'
    | 'wrapLines'
  > = {};
  if (findDefined(loading)) {
    optionalTableProps.loadingText = loading;
  }
  if (findDefined(sortingColumn)) {
    optionalTableProps.sortingColumn = sortingColumn;
  }
  if (findDefined(sortingDescending)) {
    optionalTableProps.sortingDescending = sortingDescending;
  }
  if (findDefined(visibleContent)) {
    optionalTableProps.visibleColumns = visibleContent;
  }
  if (findDefined(wrapLines)) {
    optionalTableProps.wrapLines = wrapLines;
  }

  const optionalTextFilterProps: Pick<TextFilterProps, 'filteringAriaLabel'> =
    {};
  if (findDefined(filteringAriaLabel)) {
    optionalTextFilterProps.filteringAriaLabel = filteringAriaLabel;
  }

  // Technical debt: We need a `trackBy` prop to uniquely identify the row, but
  //   AWSUI's reliance on this prop is a poor practice unique to AWSUI, and not
  //   something we want to make a part of the `Table` abstraction.
  // Consider using a `Map` or `WeakMap` to associate the row with a unique ID.
  return (
    <div ref={ref}>
      <Table<Item>
        columnDefinitions={columnDefinitions}
        header={<Header>{header}</Header>}
        items={rows}
        loading={findDefined(loading)}
        onSortingChange={handleSortingChange}
        resizableColumns
        stickyHeader
        {...optionalTableProps}
        filter={
          <TextFilter
            countText={countText}
            filteringPlaceholder={filterPlaceholder ?? '...'}
            filteringText={filter}
            onChange={handleTextFilterChange}
            {...optionalTextFilterProps}
          />
        }
        pagination={
          <Pagination
            ariaLabels={paginationAriaLabels}
            currentPageIndex={page}
            onChange={handlePaginationChange}
            pagesCount={pagesCount}
          />
        }
        preferences={
          <CollectionPreferences
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            onConfirm={handleCollectionPreferencesConfirm}
            pageSizePreference={pageSizePreference}
            preferences={preferences}
            title={collectionPreferencesTitle}
            visibleContentPreference={visibleContentPreference}
            wrapLinesPreference={wrapLinesPreference}
          />
        }
      />
      <DescriptionPortal />
    </div>
  );
}
