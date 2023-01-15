import type { ReactElement } from 'react';
import useCloudscapeTheme from './theme.cloudscape.hook';
import type Props from './types/props';

export default function CloudscapeTheme({
  children,
}: Readonly<Props>): ReactElement {
  useCloudscapeTheme();
  return <>{children}</>;
}
