import { ErrorCode } from "@quisido/authn-shared";
import { MetricName } from "../../constants/metric-name.js";
import { emitPrivateMetric, emitPublicMetric } from "../../constants/worker.js";
import FatalError from "../../utils/fatal-error.js";

export default function handleMissingPatreonIdentityId(data: Record<string, unknown>): never {
  emitPublicMetric({ name: MetricName.MissingPatreonIdentityId });

  emitPrivateMetric({
    data: JSON.stringify(data),
    name: MetricName.MissingPatreonIdentityId,
  });

  throw new FatalError(ErrorCode.MissingPatreonIdentityId);
}
