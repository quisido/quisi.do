import { WhoAmIResponseCode } from "@quisido/authn-shared";
import MetricName from "../../constants/metric-name.js";
import StatusCode from "../../constants/status-code.js";
import getTelemetry from "../../utils/get-telemetry.js";
import getResponseHeaders from "./get-response-headers.js";

export default function handleMissingAuthnId(): Response {
  const { emitPublicMetric } = getTelemetry();
  emitPublicMetric({ name: MetricName.MissingAuthnId });

  return new Response(
    JSON.stringify({
      code: WhoAmIResponseCode.MissingAuthnId,
    }),
    {
      headers: getResponseHeaders(),
      status: StatusCode.OK,
    },
  );
}
