import type { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import PublicationCards from '../../components/publication-cards';
import usePublications from './publications.hook';

export default function Publications(): ReactElement {
  const { breadcrumbs } = usePublications();

  return (
    <AppLayout breadcrumbs={breadcrumbs} toolsHide>
      <PublicationCards />
    </AppLayout>
  );
}
