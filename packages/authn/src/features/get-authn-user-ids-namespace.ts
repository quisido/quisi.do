import isKVNamespace from '../utils/is-kv-namespace.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import handleInvalidAuthnUserIdsNamespace from './handle-invalid-authn-user-ids-namespace.js';
import handleMissingAuthnUserIdsNamespace from './handle-missing-authn-user-ids-namespace.js';

export default function getAuthnUserIdsNamespace(
  this: AuthnFetchHandler,
): KVNamespace {
  const authnUserIds: unknown = this.getEnv('AUTHN_USER_IDS');

  if (isKVNamespace(authnUserIds)) {
    return authnUserIds;
  }

  if (typeof authnUserIds === 'undefined') {
    return handleMissingAuthnUserIdsNamespace.call(this);
  }

  return handleInvalidAuthnUserIdsNamespace.call(this, authnUserIds);
}
