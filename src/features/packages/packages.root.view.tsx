import Box from '@awsui/components-react/box';
import Spinner from '@awsui/components-react/spinner';
import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Wrapper from '../../components/wrapper';
import usePackages from './packages.root.hook';

const Contents: ComponentType<unknown> = lazy(
  async () => import('./packages.contents.view'),
);

export default function Packages(): ReactElement {
  const { breadcrumbs, notifications } = usePackages();

  return (
    <Wrapper
      breadcrumbs={breadcrumbs}
      contentType="table"
      notifications={notifications}
      toolsHide
    >
      <Suspense
        fallback={
          <Box textAlign="center">
            <Spinner />
            <I18n>Loading packages</I18n>
          </Box>
        }
      >
        <Contents />
      </Suspense>
    </Wrapper>
  );
}
