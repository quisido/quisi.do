import { isNumber } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import putBudget from '../features/put-budget.js';
import parseJson from '../utils/parse-json.js';
import handleInvalidBudget from './handle-invalid-budget.js';

const BUDGET_JSON_LENGTH = 2;

const isBudgetJson = (value: unknown): value is readonly [number, number] =>
  Array.isArray(value) &&
  value.every(isNumber) &&
  value.length === BUDGET_JSON_LENGTH;

interface Options {
  readonly budgetStr: string;
  readonly fiscalUserKey: string;
}

export default async function calculateBudgetRefund(
  this: AuthnFetchHandler,
  { budgetStr, fiscalUserKey }: Options,
): Promise<void> {
  const budgetJson: unknown = parseJson(budgetStr);
  if (typeof budgetJson === 'undefined' || !isBudgetJson(budgetJson)) {
    handleInvalidBudget.call(this, { budgetStr, fiscalUserKey });
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
