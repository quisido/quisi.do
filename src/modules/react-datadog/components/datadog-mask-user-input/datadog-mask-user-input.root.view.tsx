import type { ReactElement, ReactNode } from 'react';
import DataDogPrivacy from '../../components/datadog-privacy';

interface Props {
  readonly children: ReactNode;
}

export default function DataDogMaskUserInput({
  children,
}: Props): ReactElement {
  return <DataDogPrivacy level="mask-user-input">{children}</DataDogPrivacy>;
}
