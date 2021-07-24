import type { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import usePublications from './publications.hook';
import Contents from './publications.suspense.contents';

export default function Publications(): ReactElement {
  const { breadcrumbs } = usePublications();

  return (
    <AppLayout breadcrumbs={breadcrumbs} toolsHide>
      <Contents />
    </AppLayout>
  );
}
