import type { PropsWithChildren, ReactElement } from 'react';
import LocaleLayout from '../../app/[locale]/layout';
import { type Params } from '../../app-components/locale-layout';
import Locale from '../../constants/locale';

const DEFAULT_PARAMS: Params = {
  locale: Locale.English,
};

export default function DefaultLayout({
  children,
}: PropsWithChildren): ReactElement {
  return <LocaleLayout params={DEFAULT_PARAMS}>{children}</LocaleLayout>;
}
