import type { ReactElement, ReactNode } from 'react';
import useAwsTheme from './theme.aws.hook';

interface Props {
  readonly children: ReactNode;
}

export default function AwsTheme({ children }: Props): ReactElement {
  useAwsTheme();
  return <>{children}</>;
}
