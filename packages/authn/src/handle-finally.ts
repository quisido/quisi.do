import { isNumber } from 'fmrs';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import { MILLISECONDS_PER_SECOND } from './constants/time.js';
import { MetricName } from './constants/metric-name.js';
import parseJson from './utils/parse-json.js';
import putBudget from './features/put-budget.js';

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
  const budgetStr: string | null = await this.getKVNamespaceText(
    'BUDGET',
    fiscalUserKey,
  );

  // If no budget exists for this user, create one from 0.
  if (budgetStr === null) {
    await putBudget.call(this, {
      fiscalUserKey,
      previousRemainingBudget: 0,
      storedDataRefund: 0,
    });
    return;
  }

  // If the budget is invalid, emit and log.
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
  const storageSecondsRefund: number =
    (paidUntil - this.now()) / MILLISECONDS_PER_SECOND;

  await putBudget.call(this, {
    fiscalUserKey,
    previousRemainingBudget,
    storedDataRefund: budgetStr.length * storageSecondsRefund,
  });
}
