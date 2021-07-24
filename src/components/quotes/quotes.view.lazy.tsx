import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import type { ReactElement } from 'react';
import { Suspense, lazy } from 'react';

// TODO: Lazy should only apply to the contents of <AppLayout />, so dynamic
//   state like breadcrumbs, notifications, and tools needs to be set using
//   an event listener on the child node.

const QuotesLazy = lazy(async () => import('./quotes.view'));

export default function QuotesSuspense(): ReactElement {
  return (
    <Suspense
      fallback={
        <Box>
          <Spinner />
          Loading quotes
        </Box>
      }
    >
      <QuotesLazy />
    </Suspense>
  );
}
