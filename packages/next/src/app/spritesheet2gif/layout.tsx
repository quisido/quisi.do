import { type PropsWithChildren, type ReactElement } from 'react';
import Locale from '../../constants/locale';
import Layout from '../[locale]/layout';

export default function Spritesheet2GifLayout({
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
