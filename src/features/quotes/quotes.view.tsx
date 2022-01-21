import I18n from 'lazy-i18n';
import type { ComponentType, ReactElement } from 'react';
import { lazy } from 'react';
import Wrapper from '../../components/wrapper';
import useQuotes from './quotes.hook';

const Contents: ComponentType<unknown> = lazy(
  async () => import('./components/contents'),
);

export default function Quotes(): ReactElement {
  const { breadcrumbs } = useQuotes();

  return (
    <Wrapper
      breadcrumbs={breadcrumbs}
      fallback={<I18n>Loading quotes</I18n>}
      toolsHide
    >
      <Contents />
    </Wrapper>
  );
}
