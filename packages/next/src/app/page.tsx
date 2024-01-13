import { type ReactElement } from 'react';
import Locale from '../constants/locale.js';
import Layout from './[locale]/layout.js';
import Page from './[locale]/page.js';

export default function RootPage(): ReactElement {
  return (
    <Layout
      params={{
        locale: Locale.English,
      }}
    >
      <Page />
    </Layout>
  );
}
