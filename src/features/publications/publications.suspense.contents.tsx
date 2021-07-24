import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import Contents from './publications.lazy.contents';

export default function PublicationsContentsSuspense(): ReactElement {
  return (
    <Suspense
      fallback={
        <Box textAlign="center">
          <Spinner />
          <I18n>Loading publications</I18n>
        </Box>
      }
    >
      <Contents />
    </Suspense>
  );
}
