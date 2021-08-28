import CollectionPreferences from '@awsui/components-react/collection-preferences';
import Header from '@awsui/components-react/header';
import Pagination from '@awsui/components-react/pagination';
import type { TableProps } from '@awsui/components-react/table';
import Table from '@awsui/components-react/table';
import type { TextFilterProps } from '@awsui/components-react/text-filter';
import TextFilter from '@awsui/components-react/text-filter';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import usePackagesContents from './packages.hook.contents';
import type Item from './packages.type.item';

export default function PackagesContents(): ReactElement {
  const {
    cancelLabel,
    collectionPreferencesTitle,
    columnDefinitions,
    confirmLabel,
    countText,
    currentPageIndex,
    filteringAriaLabel,
    filteringText,
    filteringPlaceholder,
    handleCollectionPreferencesConfirm,
    handlePaginationChange,
    handleSortingChange,
    handleTextFilterChange,
    items,
    loading,
    loadingText,
    pageSizePreference,
    pagesCount,
    preferences,
    ref,
    sortingColumn,
    sortingDescending,
    visibleContent,
    visibleContentPreference,
    wrapLines,
    wrapLinesPreference,
  } = usePackagesContents();

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalTableProps: Pick<
    TableProps<Item>,
    'sortingColumn' | 'sortingDescending' | 'visibleColumns' | 'wrapLines'
  > = {};
  if (typeof sortingColumn !== 'undefined') {
    optionalTableProps.sortingColumn = sortingColumn;
  }
  if (typeof sortingDescending !== 'undefined') {
    optionalTableProps.sortingDescending = sortingDescending;
  }
  if (typeof visibleContent !== 'undefined') {
    optionalTableProps.visibleColumns = visibleContent;
  }
  if (typeof wrapLines !== 'undefined') {
    optionalTableProps.wrapLines = wrapLines;
  }
  const optionalTextFilterProps: Pick<TextFilterProps, 'filteringAriaLabel'> =
    {};
  if (typeof filteringAriaLabel !== 'undefined') {
    optionalTextFilterProps.filteringAriaLabel = filteringAriaLabel;
  }

  return (
    <div ref={ref}>
      <Table<Item>
        columnDefinitions={columnDefinitions}
        items={items}
        loading={loading}
        loadingText={loadingText}
        // onRowClick={handleRowClick}
        onSortingChange={handleSortingChange}
        resizableColumns
        stickyHeader
        trackBy="packageName"
        {...optionalTableProps}
        filter={
          <TextFilter
            countText={countText}
            filteringPlaceholder={filteringPlaceholder}
            filteringText={filteringText}
            onChange={handleTextFilterChange}
            {...optionalTextFilterProps}
          />
        }
        header={
          <Header>
            <I18n>Packages</I18n>
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
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
    </div>
  );
}
