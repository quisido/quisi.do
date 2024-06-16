import { WhoAmIResponseCode } from '@quisido/authn-shared';
import MetricName from '../../constants/metric-name.js';
import StatusCode from '../../constants/status-code.js';
import getTelemetry from '../../utils/get-telemetry.js';
import getWhoAmIResponseHeaders from './get-whoami-response-headers.js';

export default function handleMissingAuthnId(): Response {
  const { emitPublicMetric } = getTelemetry();
  emitPublicMetric({ name: MetricName.MissingAuthnId });

  return new Response(
    JSON.stringify({
      code: WhoAmIResponseCode.MissingAuthnId,
    }),
    {
      headers: getWhoAmIResponseHeaders(),
      status: StatusCode.OK,
    },
  );
}
