import Header from '@cloudscape-design/components/header';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/header';

export default function CloudscapeDesignHeader({
  actions,
  children,
}: Props): ReactElement {
  return <Header actions={actions}>{children}</Header>;
}
