import { Pricing } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import mapTimeToNextNextMonth from '../utils/map-time-to-next-next-month.js';
import getStoredBudgetData from '../utils/get-stored-budget-data.js';

interface Options {
  readonly fiscalUserKey: string;
  readonly previousRemainingBudget: number;
  readonly storedDataRefund: number;
}

export default async function putBudget(
  this: AuthnFetchHandler,
  { fiscalUserKey, previousRemainingBudget, storedDataRefund }: Options,
): Promise<void> {
  const now: number = this.now();

  /**
   *   Pay until the end of the month to support read access. Pay for an
   * additional month to maintain the data even if payment is not made on time.
   */
  const nextNextMonth: number = mapTimeToNextNextMonth(now);

  // Subtract the cost of this operation.
  let remainingBudget: number = previousRemainingBudget - this.totalExpense;

  // Refund what's already been paid for the previous budget.
  remainingBudget += Pricing.KVStoredData * storedDataRefund;

  // Include the cost of emitting the private metric.
  remainingBudget -= Pricing.AnalyticsDataPointsWritten;

  // Include the cost of emitting the public metric.
  remainingBudget -= Pricing.AnalyticsDataPointsWritten;

  // Include the cost of writing the updated budget.
  remainingBudget -= Pricing.KVKeysWritten;

  // Include the cost of storing the updated budget.
  const storedBudgetData: number = getStoredBudgetData({
    now,
    paidUntil: nextNextMonth,
    remainingBudget,
  });
  remainingBudget -= Pricing.KVStoredData * storedBudgetData;

  await this.putKVNamespace(
    'BUDGET',
    fiscalUserKey,
    JSON.stringify([remainingBudget, nextNextMonth]),
  );
}
