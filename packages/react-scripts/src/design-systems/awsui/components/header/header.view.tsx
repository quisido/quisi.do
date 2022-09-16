import Header from '@awsui/components-react/header';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/header';

export default function AwsuiHeader({
  actions,
  children,
}: Readonly<Props>): ReactElement {
  return <Header actions={actions}>{children}</Header>;
}
