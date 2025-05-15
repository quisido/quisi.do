import {
  useEffect,
  useMemo,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import useHostname from '../hooks/use-hostname.js';
import useTelemetrySdkLanguage from '../hooks/use-telemetry-sdk-language.js';
import TracerProviderProvider from '../modules/react-tracer/index.js';
import noop from '../utils/noop.js';
import WebTracerProvider from './web-tracer-provider.js';

/*
Const EVENT_NAMES: readonly EventName[] = [
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

export default function TracerProviderProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  // Contexts
  const hostname: string = useHostname();
  const telemetrySdkLanguage: string = useTelemetrySdkLanguage();

  // States
  const value: WebTracerProvider = useMemo(
    (): WebTracerProvider =>
      new WebTracerProvider(hostname, telemetrySdkLanguage),
    [hostname, telemetrySdkLanguage],
  );

  // Effects
  useEffect((): VoidFunction => {
    return (): void => {
      value.shutdown().catch(noop);
    };
  }, [value]);

  return (
    <TracerProviderProvider value={value}>{children}</TracerProviderProvider>
  );
}
