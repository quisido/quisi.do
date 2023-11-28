import { type PropsWithChildren, type ReactElement } from 'react';
import Locale from '../../constants/locale';
import Layout from '../[locale]/layout';

export default function CharitiesLayout({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return (
    <Layout
      params={{
        locale: Locale.English,
      }}
    >
      {children}
    </Layout>
  );
}
