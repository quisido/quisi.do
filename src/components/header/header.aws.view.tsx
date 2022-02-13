import Header from '@awsui/components-react/header';
import type { ReactElement } from 'react';
import type Props from './types/props';

export default function AwsHeader({
  actions,
  children,
}: Readonly<Props>): ReactElement {
  return <Header actions={actions}>{children}</Header>;
}
