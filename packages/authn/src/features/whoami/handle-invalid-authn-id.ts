import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import StatusCode from '../../constants/status-code.js';
import getTelemetry from '../../utils/get-telemetry.js';
import getWhoAmIResponseHeaders from './get-whoami-response-headers.js';

export default function handleInvalidAuthnId(authnId: string): Response {
  const { emitPrivateMetric, emitPublicMetric } = getTelemetry();
  emitPrivateMetric({ authnId, name: MetricName.InvalidAuthnId });
  emitPublicMetric({ name: MetricName.InvalidAuthnId });

  return new Response(
    JSON.stringify({
      code: WhoAmIResponseCode.InvalidAuthnId,
    }),
    {
      headers: getWhoAmIResponseHeaders(),
      status: StatusCode.OK,
    },
  );
}
