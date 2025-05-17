import {
  TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS,
  TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS,
} from '@opentelemetry/semantic-conventions';
import useWindow from '../hooks/use-window.js';

export default function useTelemetrySdkLanguage(): string {
  const wndw: Window | null = useWindow();

  if (wndw === null) {
    return TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS;
  }

  return TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS;
}
