import { ErrorCode } from "@quisido/authn-shared";
import type Worker from '@quisido/worker';
import { MetricName } from "../../constants/metric-name.js";
import FatalError from "../../utils/fatal-error.js";

export default function handleMissingPatreonIdentityId(this: Worker,data: Record<string, unknown>): never {
  this.emitPublicMetric({ name: MetricName.MissingPatreonIdentityId });

  this.emitPrivateMetric({
    data: JSON.stringify(data),
    name: MetricName.MissingPatreonIdentityId,
  });

  throw new FatalError(ErrorCode.MissingPatreonIdentityId);
}
