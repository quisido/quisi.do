import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';
import useWrapper from './wrapper.root.hook';

const AwsWrapper = lazy(async () => import('./wrapper.aws.view'));
const MuiWrapper = lazy(async () => import('./wrapper.mui.view'));

export default function Wrapper({
  breadcrumbs: breadcrumbsProp,
  ...props
}: Readonly<
  Omit<Props, 'breadcrumbs'> & Partial<Pick<Props, 'breadcrumbs'>>
>): ReactElement {
  const { breadcrumbs: breadcrumbsState } = useWrapper({
    breadcrumbs: breadcrumbsProp,
  });

  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsWrapper,
        [DesignSystem.Material]: MuiWrapper,
      }}
      props={{
        breadcrumbs: breadcrumbsState,
        ...props,
      }}
    />
  );
}
