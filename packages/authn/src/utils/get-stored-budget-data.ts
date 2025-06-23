import { MILLISECONDS_PER_SECOND } from '../constants/time.js';

// Calculates the byte-seconds for storing a user's budget.

interface Options {
  readonly now: number;
  readonly paidUntil: number;
  readonly remainingBudget: number;
}

export default function getStoredBudgetData({
  now,
  paidUntil,
  remainingBudget,
}: Options): number {
  /**
   *   We can't know how many bytes we will store until we know how much budget
   * is remaining, and we can't know how much budget is remaining until we know
   * how many bytes to charge for storage.
   *   While the upcoming remaining budget should be less than the previous
   * remaining budget, its string length may be greater. For example, 1/1111111
   * is 9.00000090000009e-7 with a string length of 19; however, 1/11111111, a
   * smaller number, is 9.000000090000001e-8 with a string length of 20.
   *   To solve this, we overestimate the bytes we will store by assuming the
   * budget repeated will have a longer string length than the final budget.
   *   e.g. `100 - 1` (99) has a string length of 2, but "[99,99]" is an
   * overestimate with a string length of 7.
   */
  const overEstimatedStorageBytes: number = JSON.stringify([
    remainingBudget,
    remainingBudget,
    paidUntil,
  ]).length;

  const secondsUntilExpiration: number =
    (paidUntil - now) / MILLISECONDS_PER_SECOND;

  return overEstimatedStorageBytes * secondsUntilExpiration;
}
