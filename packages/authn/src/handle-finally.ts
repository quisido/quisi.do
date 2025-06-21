import { Pricing } from 'cloudflare-utils';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import { SECONDS_PER_DAY, MINIMUM_DAYS_PER_MONTH } from './constants/time.js';

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
  const budgetStr: string =
    (await this.getKVNamespaceText('BUDGET', fiscalUserKey)) ?? '0';
  const budget: number = Number.parseFloat(budgetStr);

  await this.putKVNamespace(
    'BUDGET',
    fiscalUserKey,
    (
      budget -
      this.totalExpense -
      Pricing.KVKeysWritten -
      /**
       *   Technical debt: We shouldn't charge for a whole month every time
       * this value updates. It should only charge until it updates again. Can
       * this be retroactively charged (time since last written)? Should we
       * charge on a cron job instead?
       */
      Pricing.KVStoredData *
        budgetStr.length *
        SECONDS_PER_DAY *
        MINIMUM_DAYS_PER_MONTH -
      // Public metric
      Pricing.AnalyticsDataPointsWritten -
      // Private metric
      Pricing.AnalyticsDataPointsWritten
    ).toString(),
  );
}
