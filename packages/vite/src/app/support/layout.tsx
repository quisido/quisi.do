import { type PropsWithChildren, type ReactElement } from 'react';
import Locale from '../../constants/locale.js';
import Layout from '../[locale]/layout.js';

export default function SupportLayout({
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
