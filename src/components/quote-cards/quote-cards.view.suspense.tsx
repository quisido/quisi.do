import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import { ReactElement, Suspense } from 'react';
import LazyQuoteCards from './quote-cards.view.lazy';

export default function QuoteCardsSuspense(): ReactElement {
  return (
    <Suspense
      fallback={
        <Box textAlign="center">
          <Spinner />
          <I18n>Loading quotes</I18n>
        </Box>
      }
    >
      <LazyQuoteCards />
    </Suspense>
  );
}
