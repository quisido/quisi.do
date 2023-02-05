import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import WrapperVariantContext from '../../contexts/wrapper-variant';
import Fallback from './components/fallback';
import type InnerProps from './types/props';
import useWrapper from './wrapper.root.hook';

export type Props = Omit<InnerProps, 'breadcrumbs'> &
  Partial<Pick<InnerProps, 'breadcrumbs'>>;

const AwsWrapper = lazy(async () => import('./wrapper.aws.view'));
const CloudscapeWrapper = lazy(async () => import('./wrapper.cloudscape.view'));
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
  contentType,
  ...props
}: Readonly<Props>): ReactElement {
  const { breadcrumbs: breadcrumbsState } = useWrapper({
    breadcrumbs: breadcrumbsProp,
  });

  return (
    <WrapperVariantContext.Provider value={contentType}>
      <Design
        Fallback={Fallback}
        components={{
          [DesignSystem.Aws]: AwsWrapper,
          [DesignSystem.Cloudscape]: CloudscapeWrapper,
          [DesignSystem.Material]: MuiWrapper,
        }}
        props={{
          breadcrumbs: breadcrumbsState,
          ...props,
        }}
      />
    </WrapperVariantContext.Provider>
  );
}
