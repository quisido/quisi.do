import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import LazyPackagesTable from './packages-table.view.lazy';

export default function PackagesTableSuspense(): ReactElement {
  return (
    <Suspense
      fallback={
        <Box textAlign="center">
          <Spinner />
          <I18n>Loading packages</I18n>
        </Box>
      }
    >
      <LazyPackagesTable />
    </Suspense>
  );
}
