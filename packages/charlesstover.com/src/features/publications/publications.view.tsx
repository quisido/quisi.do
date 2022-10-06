import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { lazy } from 'react';
import Wrapper from '../../components/wrapper';
import usePublications from './publications.hook';

const Content: ComponentType<unknown> = lazy(
  async () => import('./components/content'),
);

export default function Publications(): ReactElement {
  const { breadcrumbs } = usePublications();

  return (
    <Wrapper
      breadcrumbs={breadcrumbs}
      fallback={<I18n>Loading publications</I18n>}
      toolsHide
    >
      <Content />
    </Wrapper>
  );
}
