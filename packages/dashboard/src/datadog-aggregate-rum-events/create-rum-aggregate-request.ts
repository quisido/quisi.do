import type { RUMCompute } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';

export default function createRumAggregateRequest(
  applicationId: string,
  compute: readonly RUMCompute[],
  filter: { readonly from: string; readonly to: string },
) {
  return {
    body: {
      compute: [...compute],
      filter,
      search: {
        query: `@application.id:${applicationId} @type:view`,
      },
    },
  };
}
