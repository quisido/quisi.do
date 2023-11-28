import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import HONEYCOMB_TEAM from './honeycomb-team.js';

const OPEN_TELEMETRY_EXPORTER: OTLPTraceExporter = new OTLPTraceExporter({
  url: 'https://api.honeycomb.io:443/v1/traces',
  headers: {
    'x-honeycomb-team': HONEYCOMB_TEAM,
  },
});

export default OPEN_TELEMETRY_EXPORTER;
