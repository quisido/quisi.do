import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import Contents from './quotes.lazy.contents';

export default function QuotesContentsSuspense(): ReactElement {
  return (
    <Suspense
      fallback={
        <Box>
          <Spinner />
          <I18n>Loading quotes</I18n>
        </Box>
      }
    >
      <Contents />
    </Suspense>
  );
}
