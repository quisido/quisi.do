import type { ReactElement, ReactNode } from 'react';
import DatadogPrivacy from '../../components/datadog-privacy';

interface Props {
  readonly children: ReactNode;
}

export default function DatadogHidden({ children }: Props): ReactElement {
  return <DatadogPrivacy level="hidden">{children}</DatadogPrivacy>;
}
