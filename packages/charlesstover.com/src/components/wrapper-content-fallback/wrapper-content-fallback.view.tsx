import type { PropsWithChildren, ReactElement } from 'react';
import Div from '../../components/div';
import LoadingIcon from '../../components/loading-icon';

export default function WrapperContentFallback({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return (
    <Div textAlign="center">
      <LoadingIcon />
      {children}
    </Div>
  );
}
