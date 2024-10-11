import type Worker from '@quisido/worker';
import { type OAuthProvider } from '../../constants/oauth-provider.js';
import getDataBucket from '../get-data-bucket.js';

export default async function writeOAuthResponse(
  this: Worker,
  provider: OAuthProvider,
  id: string,
  response: Record<string, unknown>,
): Promise<void> {
  const dataBucket: R2Bucket | null = getDataBucket.call(this);
  if (dataBucket === null) {
    return;
  }

  await dataBucket.put(
    `provider-${provider.toString()}/${id}.json`,
    JSON.stringify(response),
    {
      customMetadata: {
        timestamp: this.getNow().toString(),
      },
      httpMetadata: {
        contentType: 'application/json',
      },
    },
  );
}
