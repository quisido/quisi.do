import type { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import usePackages from './packages.hook';
import Contents from './packages.suspense.contents';

export default function Packages(): ReactElement {
  const { breadcrumbs, notifications } = usePackages();

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      contentType="table"
      notifications={notifications}
      toolsHide
    >
      <Contents />
    </AppLayout>
  );
}
