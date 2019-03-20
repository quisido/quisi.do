import {
  TELEMETRYSDKLANGUAGEVALUES_NODEJS,
  TELEMETRYSDKLANGUAGEVALUES_WEBJS,
} from '@opentelemetry/semantic-conventions';

export default function getTelemetrySdkLanguage(): string {
  if (typeof window === 'undefined') {
    return TELEMETRYSDKLANGUAGEVALUES_NODEJS;
  }
  return TELEMETRYSDKLANGUAGEVALUES_WEBJS;
}
