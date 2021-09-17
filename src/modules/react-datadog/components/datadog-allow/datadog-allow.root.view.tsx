import type { ReactElement, ReactNode } from 'react';
import DataDogPrivacy from '../../components/datadog-privacy';

interface Props {
  readonly children: ReactNode;
}

export default function DataDogAllow({ children }: Props): ReactElement {
  return <DataDogPrivacy level="allow">{children}</DataDogPrivacy>;
}
