const BASE = 10;
const MAX_BUDGET = 500000000;
const PERCENT = 100;
const BUDGET_PRECISION = 2;
const BUDGET_POW = Math.pow(BASE, BUDGET_PRECISION);

export default function mapBudgetToPercentage(remaining: number): number {
  return (
    Math.round((remaining / MAX_BUDGET) * PERCENT * BUDGET_POW) / BUDGET_POW
  );
}
