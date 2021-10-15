import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Breadcrumb from '../../types/breadcrumb';
import useBreadcrumbs from './breadcrumbs.root.hook';

interface Props {
  readonly children: readonly Readonly<Breadcrumb>[];
}

const AwsBreadcrumbs: ComponentType<Props> = lazy(
  async () => import('./breadcrumbs.aws.view'),
);

const MuiBreadcrumbs: ComponentType<Props> = lazy(
  async () => import('./breadcrumbs.mui.view'),
);

export default function Breadcrumbs({
  children,
}: Readonly<Props>): ReactElement {
  const breadcrumbs: readonly Breadcrumb[] = useBreadcrumbs(children);

  return (
    <Suspense fallback={null}>
      <Design
        props={{ children: breadcrumbs }}
        components={{
          [DesignSystem.Aws]: AwsBreadcrumbs,
          [DesignSystem.Material]: MuiBreadcrumbs,
        }}
      />
    </Suspense>
  );
}
