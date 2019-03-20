import { type PropsWithChildren, type ReactElement, memo } from 'react';
import { HostnameProvider } from '../contexts/hostname.js';
import getHostname from '../utils/get-hostname.js';

function HostnameProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  const hostname: string = getHostname();
  return <HostnameProvider value={hostname}>{children}</HostnameProvider>;
}

export default memo(HostnameProviderFeature);
