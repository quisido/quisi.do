'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import Div from '../../components/div';
import LoadingIcon from '../../components/loading-icon';
import type { Props } from '../wrapper';

export default function WrapperContentFallback({
  children,
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  return (
    <Div textAlign="center">
      <LoadingIcon />
      {children}
    </Div>
  );
}
