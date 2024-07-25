import { getEnv } from '../constants/worker.js';
import isKVNamespace from '../utils/is-kv-namespace.js';
import handleInvalidAuthnUserIdsNamespace from './handle-invalid-authn-user-ids-namespace.js';
import handleMissingAuthnUserIdsNamespace from './handle-missing-authn-user-ids-namespace.js';

export default function getAuthnUserIdsNamespace(): KVNamespace {
  const authnUserIds: unknown = getEnv('AUTHN_USER_IDS');

  if (isKVNamespace(authnUserIds)) {
    return authnUserIds;
  }

  if (typeof authnUserIds === 'undefined') {
    return handleMissingAuthnUserIdsNamespace();
  }

  return handleInvalidAuthnUserIdsNamespace(authnUserIds);
}
