import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import mapHostnameToHoneycombTeam from '../utils/map-hostname-to-honeycomb-team.js';

export default class OTLPTraceExporterImpl extends OTLPTraceExporter {
  public constructor(hostname: string) {
    super({
      url: 'https://api.honeycomb.io:443/v1/traces',

      headers: {
        'x-honeycomb-team': mapHostnameToHoneycombTeam(hostname),
      },
    });
  }
}
