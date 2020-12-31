import Alert from '@awsui/components-react/alert';
import Box from '@awsui/components-react/box';
import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import PieChart, { PieChartProps } from '@awsui/components-react/pie-chart';
import SpaceBetween from '@awsui/components-react/space-between';
import Table from '@awsui/components-react/table';
import Toggle from '@awsui/components-react/toggle';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import usePackages from './packages.hook';
import styles from './packages.module.scss';

const BREADCRUMBS: BreadcrumbGroupProps.Item[] = [
  {
    href: '/packages',
    text: 'Packages',
  },
];

const I18N_STRINGS: PieChartProps['i18nStrings'] = {
  chartAriaRoleDescription: 'pie chart',
  detailPopoverDismissAriaLabel: 'Dismiss',
  detailsPercentage: 'Percentage',
  detailsValue: 'Value',
  // filterLabel: 'Filter displayed data',
  // filterPlaceholder: 'Filter data',
  // filterSelectedAriaLabel: 'selected',
  legendAriaLabel: 'Legend',
  segmentAriaRoleDescription: 'segment',
};

export default function Packages(): ReactElement {
  const {
    columnDefinitions,
    detailPopoverContent,
    // filter,
    handleAlertDismiss,
    handleColumnWidthsChange,
    handleRowClick,
    handleSortingChange,
    handleUniqueDownloadsChange,
    // handleVisualizationChange,
    innerMetricValue,
    isAlertVisible,
    isLoading,
    isUniqueDownloads,
    isVisualization,
    items,
    notifications,
    ref,
    segmentDescription,
    sortingColumn,
    sortingDescending,
  } = usePackages();

  return (
    <AppLayout
      breadcrumbs={BREADCRUMBS}
      notifications={notifications}
      toolsHide
    >
      <SpaceBetween direction="vertical" size="m">
        {/*
        <Toggle checked={isVisualization} onChange={handleVisualizationChange}>
          Visualize
        </Toggle>
        */}
        {isAlertVisible && (
          <Alert
            dismissAriaLabel="Dismiss"
            dismissible
            onDismiss={handleAlertDismiss}
            type="info"
            visible={true}
          >
            Only packages with more than 2,500 downloads are shown.
          </Alert>
        )}
        {isVisualization ? (
          <>
            <PieChart
              // ariaDescription="Donut chart showing NPM packages' download count"
              additionalFilters={
                <Toggle
                  checked={isUniqueDownloads}
                  onChange={handleUniqueDownloadsChange}
                >
                  Unique downloads
                </Toggle>
              }
              ariaLabel="Donut chart"
              data={items}
              detailPopoverContent={detailPopoverContent}
              hideFilter
              hideLegend
              i18nStrings={I18N_STRINGS}
              innerMetricDescription="total downloads"
              innerMetricValue={innerMetricValue}
              loadingText="Loading packages."
              noMatch={
                <Box color="inherit" textAlign="center">
                  <strong>No matching data.</strong>
                  <Box color="inherit" variant="p">
                    There is no data available.
                  </Box>
                </Box>
              }
              segmentDescription={segmentDescription}
              size="large"
              variant="donut"
            />
          </>
        ) : (
          <div className={styles.table} ref={ref}>
            <Table
              columnDefinitions={columnDefinitions}
              // filter={filter}
              items={items}
              loading={isLoading}
              loadingText="Loading packages"
              onColumnWidthsChange={handleColumnWidthsChange}
              onRowClick={handleRowClick}
              onSortingChange={handleSortingChange}
              resizableColumns
              sortingColumn={sortingColumn}
              sortingDescending={sortingDescending}
              stickyHeader
              trackBy="packageName"
              wrapLines
            />
          </div>
        )}
      </SpaceBetween>
    </AppLayout>
  );
}
