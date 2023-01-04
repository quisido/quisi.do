import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { lazy } from 'react';
import Wrapper from '../../components/wrapper';
import useDashboard from './dashboard.hook';

const Content: ComponentType<unknown> = lazy(
  async () => import('./components/content'),
);

export default function Dashboard(): ReactElement {
  const { breadcrumbs } = useDashboard();

  return (
    <Wrapper
      breadcrumbs={breadcrumbs}
      fallback={<I18n>Loading dashboard</I18n>}
      toolsHide
    >
      <Content />
    </Wrapper>
  );
}
