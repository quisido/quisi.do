import type OAuthProvider from '../../constants/oauth-provider.js';
import { getNow } from '../../constants/worker.js';
import getDataBucket from '../get-data-bucket.js';

export default async function writeOAuthResponse(
  provider: OAuthProvider,
  id: string,
  response: Record<string, unknown>,
): Promise<void> {
  const dataBucket: R2Bucket | null = getDataBucket();
  if (dataBucket === null) {
    return;
  }

  await dataBucket.put(
    `provider-${provider.toString()}/${id}.json`,
    JSON.stringify(response),
    {
      customMetadata: {
        timestamp: getNow().toString(),
      },
      httpMetadata: {
        contentType: 'application/json',
      },
    },
  );
}
