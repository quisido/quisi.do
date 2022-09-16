import type { ReactElement } from 'react';
import WrapperVariantContext from '../../contexts/wrapper-variant';
import Fallback from '../wrapper-content-fallback';
import type InnerProps from './types/props';
import useWrapper from './wrapper.hook';
import DesignSystem from '../design-system';

export type Props = Omit<InnerProps, 'breadcrumbs'> &
  Partial<Pick<InnerProps, 'breadcrumbs'>>;

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
      <DesignSystem
        Fallback={Fallback}
        props={{
          breadcrumbs: breadcrumbsState,
          ...props,
        }}
        type="wrapper"
      />
    </WrapperVariantContext.Provider>
  );
}
