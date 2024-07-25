import getAuthnUserIdsNamespace from '../../features/get-authn-user-ids-namespace.js';

export default async function getAuthnUserIdFromKVNamespace(
  authnId: string,
): Promise<string | null> {
  const authnUserIds: KVNamespace = getAuthnUserIdsNamespace();
  return await authnUserIds.get(authnId, 'text');
}
