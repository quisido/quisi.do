import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { lazy } from 'react';
import Wrapper from '../../components/wrapper';
import usePackages from './packages.hook';

const Content: ComponentType<unknown> = lazy(
  async () => import('./components/content'),
);

export default function Packages(): ReactElement {
  const { breadcrumbs, notifications } = usePackages();

  return (
    <Wrapper
      breadcrumbs={breadcrumbs}
      contentType="table"
      fallback={<I18n>Loading packages</I18n>}
      notifications={notifications}
      toolsHide
    >
      <Content />
    </Wrapper>
  );
}
