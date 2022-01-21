import type { PropsWithChildren, ReactElement } from 'react';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';

export default function Fallback({
  children,
}: Readonly<PropsWithChildren<unknown>>): ReactElement {
  return (
    <Div textAlign="center">
      <LoadingIcon />
      {children}
    </Div>
  );
}
