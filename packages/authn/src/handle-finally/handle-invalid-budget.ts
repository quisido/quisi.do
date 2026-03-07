import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';

interface Options {
  readonly budgetStr: string;
  readonly fiscalUserKey: string;
}

export default function handleInvalidBudget(
  this: AuthnFetchHandler,
  { budgetStr, fiscalUserKey }: Options,
): void {
  this.emitPrivateMetric(MetricName.InvalidBudget);
  this.emitPublicMetric(MetricName.InvalidBudget, {
    budgetStr,
    fiscalUserKey,
  });

  this.logError(
    new Error(`Invalid budget for user "${this.fiscalUserId}"`, {
      cause: budgetStr,
    }),
  );
}
