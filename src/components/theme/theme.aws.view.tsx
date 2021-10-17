// TODO: Somehow remove this when unmounting, because the global styles conflict
//   with Material UI.
import '@awsui/global-styles/index.css';
import type { ReactElement, ReactNode } from 'react';
import useAwsTheme from './theme.aws.hook';

interface Props {
  readonly children: ReactNode;
}

export default function AwsTheme({ children }: Props): ReactElement {
  useAwsTheme();
  return <>{children}</>;
}
