import SpaceBetween from '@awsui/components-react/space-between';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import PackagesTable from '../../components/packages-table';
import usePackages from './packages.hook';

/*
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
*/

export default function Packages(): ReactElement {
  const {
    breadcrumbs,
    // detailPopoverContent,
    // handleUniqueDownloadsChange,
    // innerMetricValue,
    // isUniqueDownloads,
    // items,
    notifications,
    // segmentDescription,
  } = usePackages();

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      contentType="table"
      notifications={notifications}
      toolsHide
    >
      <SpaceBetween direction="vertical" size="m">
        {/*
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
          data={[]}
          // detailPopoverContent={detailPopoverContent}
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
          // segmentDescription={segmentDescription}
          size="large"
          variant="donut"
        />
        */}
        <PackagesTable />
      </SpaceBetween>
    </AppLayout>
  );
}
