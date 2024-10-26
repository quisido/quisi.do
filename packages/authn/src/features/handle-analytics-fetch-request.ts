import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import WhoAmIOptionsResponse from '../routes/whoami/whoami-options-response.js';
import FatalError from '../utils/fatal-error.js';

export default async function handleAnalyticsFetchRequest(
  this: Worker,
): Promise<Response> {
  // Options
  const method: string = this.getRequestMethod();
  if (method === 'OPTIONS') {
    return new WhoAmIOptionsResponse(this);
  }

  const id: unknown = this.getEnv('ANALYTICS_ID');
  if (typeof id !== 'string') {
    throw new FatalError(ErrorCode.InvalidAnalyticsId);
  }

  const secret: unknown = this.getEnv('ANALYTICS_SECRET');
  if (typeof secret !== 'string') {
    throw new FatalError(ErrorCode.InvalidAnalyticsSecret);
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${id}/analytics_engine/sql`,
    {
      body: `
SELECT *
FROM AUTHN_PUBLIC
ORDER BY timestamp DESC
`,
      method: 'POST',

      headers: new Headers({
        Authorization: `Bearer ${secret}`,
      }),
    },
  );

  const { data } = await response.json();

  const clean = y => {
    for (const x of y) {
      for (const [key, val] of Object.entries(x)) {
        if (val === '' || val === 0) {
          delete x[key];
        }
      }
    }
    return y;
  };

  return new Response(JSON.stringify(clean(data), null, 2));
}
