import type { ReactElement, ReactNode } from 'react';
import DatadogPrivacy from '../../components/datadog-privacy';

interface Props {
  readonly children: ReactNode;
}

export default function DatadogAllow({ children }: Props): ReactElement {
  return <DatadogPrivacy level="allow">{children}</DatadogPrivacy>;
}
