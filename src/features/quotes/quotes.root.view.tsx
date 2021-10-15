import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Wrapper from '../../components/wrapper';
import useQuotes from './quotes.root.hook';

const Contents: ComponentType<unknown> = lazy(
  async () => import('./quotes.contents.view'),
);

export default function Quotes(): ReactElement {
  const { breadcrumbs } = useQuotes();

  return (
    <Wrapper breadcrumbs={breadcrumbs} toolsHide>
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
    </Wrapper>
  );
}
