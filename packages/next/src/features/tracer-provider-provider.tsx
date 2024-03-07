'use client';

import type { TracerProvider } from '@opentelemetry/api';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import type { EventName } from '@opentelemetry/instrumentation-user-interaction';
import {
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useMemo,
} from 'react';
import { useHostname } from '../contexts/hostname.js';
import TracerProviderProvider from '../modules/react-tracer/index.js';
import WebTracerProvider from './web-tracer-provider.js';

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

export default function TracerProviderProviderImpl({
  children,
}: PropsWithChildren): ReactElement {
  const hostname: string = useHostname();

  const value: TracerProvider = useMemo(
    (): TracerProvider => new WebTracerProvider(hostname),
    [hostname],
  );

  useEffect((): void => {
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
  }, [value]);

  return (
    <TracerProviderProvider value={value}>{children}</TracerProviderProvider>
  );
}
