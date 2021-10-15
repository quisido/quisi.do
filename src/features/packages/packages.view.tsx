import type { ReactElement } from 'react';
import Wrapper from '../../components/wrapper';
import usePackages from './packages.hook';
import Contents from './packages.suspense.contents';

export default function Packages(): ReactElement {
  const { breadcrumbs, notifications } = usePackages();

  return (
    <Wrapper
      breadcrumbs={breadcrumbs}
      contentType="table"
      notifications={notifications}
      toolsHide
    >
      <Contents />
    </Wrapper>
  );
}
