import { Pricing } from 'cloudflare-utils';
import { isNumber } from 'fmrs';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import { MILLISECONDS_PER_SECOND } from './constants/time.js';
import { MetricName } from './constants/metric-name.js';
import parseJson from './utils/parse-json.js';
import mapTimeToNextMonth from './utils/map-time-to-next-month.js';

/**
 *   WARNING: If this method emits events (expenses, logs, or metrics), it will
 * NOT be called again. For the sake of budgeting, this method cannot rely on
 * any `expense` events that itself emits. It is responsible for budgeting any
 * costs that it accrues.
 */

const BUDGET_JSON_LENGTH = 2;

const isBudgetJson = (value: unknown): value is readonly [number, number] =>
  Array.isArray(value) &&
  value.every(isNumber) &&
  value.length === BUDGET_JSON_LENGTH;

export default async function handleFinally(
  this: AuthnFetchHandler | null,
): Promise<void> {
  if (this === null) {
    return;
  }

  const fiscalUserKey: string = this.fiscalUserId.toString();
  const budgetStr: string =
    (await this.getKVNamespaceText('BUDGET', fiscalUserKey)) ?? '0';
  const budgetJson: unknown = parseJson(budgetStr);

  if (typeof budgetJson === 'undefined' || !isBudgetJson(budgetJson)) {
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
    return;
  }

  const [previousRemainingBudget, paidUntil] = budgetJson;
  const now: number = this.now();
  const nextMonth: number = mapTimeToNextMonth(now);

  const secondsUntilNextMonth: number =
    (nextMonth - now) / MILLISECONDS_PER_SECOND;

  const storageSecondsRefund: number =
    (paidUntil - now) / MILLISECONDS_PER_SECOND;

  let remainingBudget: number = previousRemainingBudget - this.totalExpense;

  // Refund what's already been paid for the previous budget.
  remainingBudget +=
    Pricing.KVStoredData * budgetStr.length * storageSecondsRefund;

  // Include the cost of writing the updated budget.
  remainingBudget -= Pricing.KVKeysWritten;

  // Include the cost of emitting the private metric.
  remainingBudget -= Pricing.AnalyticsDataPointsWritten;

  // Include the cost of emitting the public metric.
  remainingBudget -= Pricing.AnalyticsDataPointsWritten;

  /**
   *   Include the cost of storing the updated budget. We can't know how many
   * bytes we will store until we know how much budget is remaining, and we
   * can't know how much budget is remaining until we know how many bytes to
   * charge for storing.
   *   While the upcoming remaining budget should be less than the previous
   * remaining budget, its string length may be greater. For example, 1/1111111
   * is 9.00000090000009e-7 with a string length of 19; however, 1/11111111, a
   * smaller number, is 9.000000090000001e-8 with a string length of 20.
   *   To solve this, we overestimate the bytes we will store by assuming the
   * budget repeated will have a longer string length than the final budget.
   *   e.g. `100 - 1` (99) has a string length of 2, but "100,100" is an
   * overestimate with a string length of 7.
   */
  const estimatedStorageBytes: number = JSON.stringify([
    remainingBudget,
    remainingBudget,
    nextMonth,
  ]).length;
  remainingBudget -=
    Pricing.KVStoredData * estimatedStorageBytes * secondsUntilNextMonth;

  await this.putKVNamespace(
    'BUDGET',
    fiscalUserKey,
    JSON.stringify([remainingBudget, nextMonth]),
  );
}
