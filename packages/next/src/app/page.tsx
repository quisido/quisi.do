import { type ReactElement } from 'react';
import DefaultLayout from '../features/default-layout';
import Page from './[locale]/page';

export default function RootPage(): ReactElement {
  return (
    <DefaultLayout>
      <Page />
    </DefaultLayout>
  );
}
