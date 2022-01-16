import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Wrapper from '../../components/wrapper';
import usePublications from './publications.hook';

const Contents: ComponentType<unknown> = lazy(
  async () => import('./components/contents'),
);

export default function Publications(): ReactElement {
  const { breadcrumbs } = usePublications();

  return (
    <Wrapper breadcrumbs={breadcrumbs} toolsHide>
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
    </Wrapper>
  );
}
