import { type OAuthProvider } from '../../constants/oauth-provider.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';

export default async function writeOAuthResponse(
  this: AuthnFetchHandler,
  provider: OAuthProvider,
  id: string,
  response: Record<string, unknown>,
): Promise<void> {
  const { dataBucket } = this;
  if (dataBucket === null) {
    return;
  }

  await dataBucket.put(
    `provider-${provider.toString()}/${id}.json`,
    JSON.stringify(response),
    {
      customMetadata: {
        timestamp: this.now().toString(),
      },
      httpMetadata: {
        contentType: 'application/json',
      },
    },
  );
}
