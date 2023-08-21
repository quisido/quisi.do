import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import type { TableProps } from '@cloudscape-design/components/table';
import Table from '@cloudscape-design/components/table';
import type { TextFilterProps } from '@cloudscape-design/components/text-filter';
import TextFilter from '@cloudscape-design/components/text-filter';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/table';
import validateString from '../../../../utils/validate-string';
import useTable from './table.hook';
import styles from './table.module.scss';

const rootClassName: string = validateString(styles.root);

export default function CloudscapeDesignTable<Item extends object>({
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
  subheader,
  visibleColumnIndices,
}: Readonly<Props<Item>>): ReactElement {
  const {
    DescriptionPortal,
    cancelLabel,
    collectionPreferencesTitle,
    columnDefinitions,
    confirmLabel,
    countText,
    currentPageIndex,
    filteringAriaLabel,
    filteringText,
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
  } = useTable({
    Description,
    columns,
    filter,
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
  });

  // Workaround until Cloudscape supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const collectionPreferencesProps: Pick<
    CollectionPreferencesProps,
    'pageSizePreference' | 'visibleContentPreference'
  > = {};
  if (typeof pageSizePreference !== 'undefined') {
    collectionPreferencesProps.pageSizePreference = pageSizePreference;
  }
  if (typeof visibleContentPreference !== 'undefined') {
    collectionPreferencesProps.visibleContentPreference =
      visibleContentPreference;
  }

  const tableProps: Pick<
    TableProps<Item>,
    | 'loadingText'
    | 'sortingColumn'
    | 'sortingDescending'
    | 'visibleColumns'
    | 'wrapLines'
  > = {};

  if (typeof loading !== 'undefined') {
    tableProps.loadingText = loading;
  }

  if (typeof sortingColumn !== 'undefined') {
    tableProps.sortingColumn = sortingColumn;
  }

  if (typeof sortingDescending !== 'undefined') {
    tableProps.sortingDescending = sortingDescending;
  }

  if (typeof visibleContent !== 'undefined') {
    tableProps.visibleColumns = visibleContent;
  }

  if (typeof wrapLines !== 'undefined') {
    tableProps.wrapLines = wrapLines;
  }

  const textFilterProps: Pick<TextFilterProps, 'filteringAriaLabel'> = {};
  if (typeof filteringAriaLabel !== 'undefined') {
    textFilterProps.filteringAriaLabel = filteringAriaLabel;
  }

  // Technical debt: We need a `trackBy` prop to uniquely identify the row, but
  //   Cloudscape's reliance on this prop is a poor practice unique to
  //   Cloudscape, and not something we want to make a part of the `Table`
  //   abstraction.
  // Consider using a `Map` or `WeakMap` to associate the row with a unique ID.
  return (
    <div className={rootClassName} ref={ref}>
      <Table<Item>
        columnDefinitions={columnDefinitions}
        header={<Header description={subheader}>{header}</Header>}
        items={rows}
        loading={typeof loading !== 'undefined'}
        onSortingChange={handleSortingChange}
        resizableColumns
        stickyHeader
        {...tableProps}
        filter={
          typeof handleTextFilterChange !== 'undefined' && (
            <TextFilter
              countText={countText}
              filteringPlaceholder={filterPlaceholder ?? '...'}
              filteringText={filteringText}
              onChange={handleTextFilterChange}
              {...textFilterProps}
            />
          )
        }
        pagination={
          typeof handlePaginationChange !== 'undefined' && (
            <Pagination
              ariaLabels={paginationAriaLabels}
              currentPageIndex={currentPageIndex}
              onChange={handlePaginationChange}
              pagesCount={pagesCount}
            />
          )
        }
        preferences={
          <CollectionPreferences
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            onConfirm={handleCollectionPreferencesConfirm}
            preferences={preferences}
            title={collectionPreferencesTitle}
            wrapLinesPreference={wrapLinesPreference}
            {...collectionPreferencesProps}
          />
        }
      />
      <DescriptionPortal />
    </div>
  );
}
