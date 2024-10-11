import type Worker from '@quisido/worker';
import getAuthnUserIdsNamespace from '../../features/get-authn-user-ids-namespace.js';

export default async function getAuthnUserIdFromKVNamespace(
  this: Worker,
  authnId: string,
): Promise<string | null> {
  const authnUserIds: KVNamespace = getAuthnUserIdsNamespace.call(this);
  return await authnUserIds.get(authnId, 'text');
}
