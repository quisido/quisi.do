import { HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { useEffect, useMemo, type PropsWithChildren, type ReactElement } from 'react';
import { HoneycombProvider } from '../contexts/honeycomb.js';
import { useHostname } from '../contexts/hostname.js';
import Resource from '../features/resource.js';

interface Props {
  readonly apiKey: string;
  readonly serviceName: string;
}

function useSdk(sdk: HoneycombWebSDK): void {
  useEffect((): VoidFunction => {
    sdk.start();
    return (): void => {
      sdk.shutdown();
    };
  }, [sdk]);
}

export default function Honeycomb({
  apiKey,
  children,
  serviceName,
}: PropsWithChildren<Props>): ReactElement {
  const hostname: string = useHostname();

  const sdk: HoneycombWebSDK = useMemo((): HoneycombWebSDK =>
    new HoneycombWebSDK({
      apiKey,
      autoDetectResources: true,
      instrumentations: [getWebAutoInstrumentations()],
      resource: new Resource(hostname),
      serviceName,
    }),
    [apiKey, hostname, serviceName],
  );

  useSdk(sdk);

  return <HoneycombProvider value={sdk}>{children}</HoneycombProvider>;
}
