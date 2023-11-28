import { type ReactElement } from 'react';
import Locale from '../constants/locale';
import Layout from './[locale]/layout';
import Page from './[locale]/page';

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
