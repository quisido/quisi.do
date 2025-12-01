import { HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import {
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useMemo,
} from 'react';
import { HoneycombProvider } from '../contexts/honeycomb.js';
import Resource from '../features/resource.js';
import useHostname from '../hooks/use-hostname.js';
import useTelemetrySdkLanguage from '../hooks/use-telemetry-sdk-language.js';
import useWindow from '../hooks/use-window.js';
import noop from '../utils/noop.js';

interface Props {
  readonly apiKey: string;
  readonly serviceName: string;
}

function useSdk(sdk: HoneycombWebSDK | undefined): void {
  useEffect((): VoidFunction | undefined => {
    if (typeof sdk === 'undefined') {
      return;
    }

    sdk.start();
    return (): void => {
      sdk.shutdown().catch(noop);
    };
  }, [sdk]);
}

export default function Honeycomb({
  apiKey,
  children,
  serviceName,
}: PropsWithChildren<Props>): ReactElement {
  const hostname: string = useHostname();
  const telemetrySdkLanguage: string = useTelemetrySdkLanguage();
  const wndw: Window | null = useWindow();

  const sdk: HoneycombWebSDK | undefined = useMemo(():
    | HoneycombWebSDK
    | undefined => {
    if (wndw === null) {
      return;
    }

    return new HoneycombWebSDK({
      apiKey,
      autoDetectResources: true,
      instrumentations: [getWebAutoInstrumentations()],
      resource: new Resource(hostname, telemetrySdkLanguage),
      serviceName,
    });
  }, [apiKey, hostname, serviceName, telemetrySdkLanguage, wndw]);

  useSdk(sdk);

  return <HoneycombProvider value={sdk}>{children}</HoneycombProvider>;
}
