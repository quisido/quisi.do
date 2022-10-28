import type { ReactElement } from 'react';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';
import Props from '../../types/props';

export default function Fallback({
  fallback,
}: Pick<Props, 'fallback'>): ReactElement {
  return (
    <Div textAlign="center">
      <LoadingIcon />
      {fallback}
    </Div>
  );
}
