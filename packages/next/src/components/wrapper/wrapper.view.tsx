import type { PropsWithChildren, ReactElement } from 'react';
import DesignSystem from '../design-system';
import Fallback from '../wrapper-content-fallback';
import type Props from './types/props';
import useWrapper from './wrapper.hook';

/**
 * `Wrapper` uses the same lazy-loading `fallback` for its design system as it
 *   uses for its `children`.
 *
 * Step 1: <Fallback />
 * Step 2: <Wrapper><Fallback /></Wrapper>
 * Step 3: <Wrapper><Children /></Wrapper>
 */

export default function Wrapper({
  breadcrumbs: breadcrumbsProp,
  contentType,
  ...props
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  const { breadcrumbs: breadcrumbsState } = useWrapper({
    breadcrumbs: breadcrumbsProp,
  });

  return (
    // <WrapperVariantContext.Provider value={contentType}>
    <DesignSystem
      Fallback={Fallback}
      props={{
        breadcrumbs: breadcrumbsState,
        ...props,
      }}
      type="wrapper"
    />
    // </WrapperVariantContext.Provider>
  );
}
