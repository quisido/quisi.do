import CollectionPreferences from '@awsui/components-react/collection-preferences';
import Header from '@awsui/components-react/header';
import Pagination from '@awsui/components-react/pagination';
import Table from '@awsui/components-react/table';
import TextFilter from '@awsui/components-react/text-filter';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import usePackagesContents from './packages.hook.contents';

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

  return (
    <div ref={ref}>
      <Table
        columnDefinitions={columnDefinitions}
        items={items}
        loading={loading}
        loadingText={loadingText}
        // onRowClick={handleRowClick}
        onSortingChange={handleSortingChange}
        resizableColumns
        sortingColumn={sortingColumn}
        sortingDescending={sortingDescending}
        stickyHeader
        trackBy="packageName"
        visibleColumns={visibleContent}
        wrapLines={wrapLines}
        filter={
          <TextFilter
            countText={countText}
            filteringAriaLabel={filteringAriaLabel}
            filteringPlaceholder={filteringPlaceholder}
            filteringText={filteringText}
            onChange={handleTextFilterChange}
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
