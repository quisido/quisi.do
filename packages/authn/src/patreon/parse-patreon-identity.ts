import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { OAuthProvider } from '../constants/oauth-provider.js';
import handleInvalidPatreonIdentityAttributes from './handle-invalid-patreon-identity-attributes.js';
import handleInvalidPatreonIdentityData from './handle-invalid-patreon-identity-data.js';
import handleInvalidPatreonIdentityId from './handle-invalid-patreon-identity-id.js';
import mapPatreonAttributesToIdentity from './map-patreon-attributes-to-identity.js';
import type PatreonIdentity from './patreon-identity.js';

export default function parsePatreonIdentity(
  this: AuthnFetchHandler,
  identity: Record<string, unknown>,
): PatreonIdentity {
  const { data } = identity;
  if (!isRecord(data)) {
    return handleInvalidPatreonIdentityData.call(this, data);
  }

  const { attributes, id } = data;
  if (typeof id !== 'string') {
    return handleInvalidPatreonIdentityId.call(this, data, id);
  }

  this.writeOAuthResponse(OAuthProvider.Patreon, id, identity);
  if (!isRecord(attributes)) {
    return handleInvalidPatreonIdentityAttributes.call(this, {
      attributes,
      data,
      id,
    });
  }

  return mapPatreonAttributesToIdentity(id, attributes);
}
