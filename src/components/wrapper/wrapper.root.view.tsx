import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import Fallback from './components/fallback';
import type Props from './types/props';
import useWrapper from './wrapper.root.hook';

const AwsWrapper = lazy(async () => import('./wrapper.aws.view'));
const MuiWrapper = lazy(async () => import('./wrapper.mui.view'));

/*
`Wrapper` uses the same lazy-loading `fallback` for its design system as it uses
  for its `children`.
Step 1: <Fallback />
Step 2: <Wrapper><Fallback /></Wrapper>
Step 3: <Wrapper><Children /></Wrapper>
*/

export default function Wrapper({
  breadcrumbs: breadcrumbsProp,
  fallback,
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
      fallback={<Fallback>{fallback}</Fallback>}
      props={{
        breadcrumbs: breadcrumbsState,
        fallback,
        ...props,
      }}
    />
  );
}
