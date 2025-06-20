import { Pricing } from 'cloudflare-utils';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import { SECONDS_PER_DAY, MINIMUM_DAYS_PER_MONTH } from './constants/time.js';

export default async function handleFinally(
  this: AuthnFetchHandler,
): Promise<void> {
  const budgetStr: string =
    (await this.getKVNamespaceText('BUDGET', '<USER_ID_HERE>')) ?? '0';
  const budget: number = parseFloat(budgetStr);

  await this.putKVNamespace(
    'BUDGET',
    '<USER_ID_HERE>',
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
        MINIMUM_DAYS_PER_MONTH +
      // Public metric
      Pricing.AnalyticsDataPointsWritten +
      // Private metric
      Pricing.AnalyticsDataPointsWritten
    ).toString(),
  );
}
