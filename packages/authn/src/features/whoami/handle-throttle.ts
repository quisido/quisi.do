import { WhoAmIResponseCode } from "@quisido/authn-shared";
import MetricName from "../../constants/metric-name.js";
import StatusCode from "../../constants/status-code.js";
import getTelemetry from "../../utils/get-telemetry.js";
import getResponseHeaders from "./get-response-headers.js";

export default function handleThrottle(): Response {
  const { emitPublicMetric } = getTelemetry();
  emitPublicMetric({
    name: MetricName.WhoAmIThrottled,
  });

  return new Response(
    JSON.stringify({
      code: WhoAmIResponseCode.Throttled,
    }),
    {
      headers: getResponseHeaders(),
      status: StatusCode.TooManyRequests,
    },
  );
}
