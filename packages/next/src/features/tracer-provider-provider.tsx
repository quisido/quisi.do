'use client';

import {
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useMemo,
} from 'react';
import { useHostname } from '../contexts/hostname.js';
import TracerProviderProvider from '../modules/react-tracer/index.js';
import WebTracerProvider from './web-tracer-provider.js';

/*
const EVENT_NAMES: readonly EventName[] = [
  'auxclick',
  'click',
  'close',
  'contextmenu',
  'copy',
  'cut',
  'dblclick',
  'error',
  'fullscreenchange',
  'fullscreenerror',
  'load',
  'paste',
  'pause',
  'play',
  'resize',
  // 'scroll',
  'seeked',
  'select',
  'selectionchange',
  'submit',
  'toggle',
];
*/

export default function TracerProviderProviderImpl({
  children,
}: PropsWithChildren): ReactElement {
  // Contexts
  const hostname: string = useHostname();

  // States
  const value: WebTracerProvider = useMemo(
    (): WebTracerProvider => new WebTracerProvider(hostname),
    [hostname],
  );

  // Effects
  useEffect((): VoidFunction => {
    /*
    registerInstrumentations({
      // meterProvider?: MeterProvider;
      // loggerProvider?: LoggerProvider;
      tracerProvider: value,
      instrumentations: [
        getWebAutoInstrumentations({
          '@opentelemetry/instrumentation-fetch': {
            ignoreNetworkEvents: false,
          },
          '@opentelemetry/instrumentation-user-interaction': {
            eventNames: [...EVENT_NAMES],
          },
        }),
      ],
    });
    */

    return (): void => {
      void value.shutdown();
    };
  }, [value]);

  return (
    <TracerProviderProvider value={value}>{children}</TracerProviderProvider>
  );
}
