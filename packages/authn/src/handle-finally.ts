import type AuthnFetchHandler from './authn-fetch-handler.js';
import putBudget from './features/put-budget.js';
import calculateBudgetRefund from './handle-finally/calculate-budget-refund.js';

/**
 *   WARNING: If this method emits events (expenses, logs, or metrics), it will
 * NOT be called again. For the sake of budgeting, this method cannot rely on
 * any `expense` events that itself emits. It is responsible for budgeting any
 * costs that it accrues.
 */

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

  await calculateBudgetRefund.call(this, { budgetStr, fiscalUserKey });
}
