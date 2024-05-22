import { WhoAmIResponseCode } from "@quisido/authn-shared";
import MetricName from "../../constants/metric-name.js";
import StatusCode from "../../constants/status-code.js";
import getTelemetry from "../../utils/get-telemetry.js";
import getWhoAmIResponseHeaders from "./get-whoami-response-headers.js";

interface Options {
  readonly expiration: number;
  readonly id: number;
}

export default function handleCachedAuthnId({
  expiration,
  id,
}: Options): Response {
  const { emitPrivateMetric, emitPublicMetric } = getTelemetry();

  emitPrivateMetric({
    expiration,
    id,
    name: MetricName.CachedAuthnId,
  });

  emitPublicMetric({
    expiration,
    name: MetricName.CachedAuthnId,
  });

  return new Response(
    JSON.stringify({
      code: WhoAmIResponseCode.Cached,
      id,
    }),
    {
      headers: getWhoAmIResponseHeaders(),
      status: StatusCode.OK,
    },
  );
}
