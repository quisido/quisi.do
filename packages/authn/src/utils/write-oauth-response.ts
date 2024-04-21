import type OAuthProvider from '../constants/oauth-provider.js';
import getDataBucket from '../features/get-data-bucket.js';

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
        timestamp: Date.now().toString(),
      },
      httpMetadata: {
        contentType: 'application/json',
      },
    },
  );
}
