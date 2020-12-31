import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import { ReactElement, Suspense, lazy } from 'react';

// TODO: Lazy should only apply to the contents of <AppLayout />, so dynamic
//   state like breadcrumbs, notifications, and tools needs to be set using
//   an event listener on the child node.

const PackagesLazy = lazy(() => import('./packages.view'));

export default function PackagesSuspense(): ReactElement {
  return (
    <Suspense
      fallback={
        <Box textAlign="center">
          <Spinner /> Loading packages
        </Box>
      }
    >
      <PackagesLazy />
    </Suspense>
  );
}
