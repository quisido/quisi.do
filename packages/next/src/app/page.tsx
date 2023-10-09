import { type ReactElement } from 'react';
import Layout from './[locale]/layout';
import Page from './[locale]/page';

/**
 * `middleware.ts` should redirect all root pages to `./[locale]/`.
 */

const PARAMS = {
  locale: 'en-US',
};

export default function RootPage(): ReactElement {
  return (
    <Layout params={PARAMS}>
      <Page />
    </Layout>
  );
}
