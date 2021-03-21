import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import PackagesTable from '../../components/packages-table';
import usePackages from './packages.hook';

export default function Packages(): ReactElement {
  const { breadcrumbs, notifications } = usePackages();

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      contentType="table"
      notifications={notifications}
      toolsHide
    >
      <PackagesTable />
    </AppLayout>
  );
}
