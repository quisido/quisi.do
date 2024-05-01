import { WhoAmIResponseCode } from "@quisido/authn-shared";
import MetricName from "../../constants/metric-name.js";
import StatusCode from "../../constants/status-code.js";
import getTelemetry from "../../utils/get-telemetry.js";
import getResponseHeaders from "./get-response-headers.js";

export default function handleInvalidAuthnId(authnId: string): Response {
  const { emitPrivateMetric, emitPublicMetric } = getTelemetry();

  emitPrivateMetric({
    authnId,
    name: MetricName.InvalidAuthnId,
  });

  emitPublicMetric({
    name: MetricName.InvalidAuthnId,
  });

  return new Response(
    JSON.stringify({
      code: WhoAmIResponseCode.InvalidAuthnId,
    }),
    {
      headers: getResponseHeaders(),
      status: StatusCode.OK,
    },
  );
}
