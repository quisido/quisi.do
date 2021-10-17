import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';
import useWrapper from './wrapper.root.hook';

const AwsWrapper: ComponentType<Props> = lazy(
  async () => import('./wrapper.aws.view'),
);

const MuiWrapper: ComponentType<Props> = lazy(
  async () => import('./wrapper.mui.view'),
);

export default function Wrapper({
  breadcrumbs: breadcrumbsProp,
  children,
  ...props
}: Readonly<
  Omit<Props, 'breadcrumbs'> & Partial<Pick<Props, 'breadcrumbs'>>
>): ReactElement {
  const { breadcrumbs: breadcrumbsState } = useWrapper({
    breadcrumbs: breadcrumbsProp,
  });

  return (
    // fallback={<>{children}</>}
    <Suspense fallback={null}>
      <Design
        components={{
          [DesignSystem.Aws]: AwsWrapper,
          [DesignSystem.Material]: MuiWrapper,
        }}
        props={{
          breadcrumbs: breadcrumbsState,
          children,
          ...props,
        }}
      />
    </Suspense>
  );
}
