import { type PropsWithChildren, type ReactElement } from 'react';
import LogRocket from '../components/log-rocket.js';

export default function LogRocketFeature({
  children,
}: PropsWithChildren): ReactElement {
  return <LogRocket appId="zkwhgg/quisido">{children}</LogRocket>;
}
