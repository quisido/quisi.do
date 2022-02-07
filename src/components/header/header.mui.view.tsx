import type { ReactElement } from 'react';
import Div from '../../components/div';
import type Props from './types/props';

export default function MuiHeader({
  actions,
  children,
  className,
}: Readonly<Props>): ReactElement {
  return (
    <Div display="flex" flexDirection="row">
      <h1 className={className}>{children}</h1>
      {actions}
    </Div>
  );
}
