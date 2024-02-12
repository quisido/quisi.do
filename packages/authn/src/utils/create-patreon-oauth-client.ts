import { oauth, type OAuthClient } from 'patreon';

interface EmptyCache {
  readonly client: null;
  readonly id: null;
  readonly secret: null;
}

interface Cache {
  readonly client: OAuthClient;
  readonly id: string;
  readonly secret: string;
}

// Is there a better pattern than `let` for this? 🤔
let cache: Cache | EmptyCache = {
  client: null,
  id: null,
  secret: null,
};

export default function createPatreonOAuthClient(
  id: string,
  secret: string,
): OAuthClient {
  if (cache.id === id && cache.secret === secret) {
    return cache.client;
  }

  const client: OAuthClient = oauth(id, secret);
  cache = {
    client,
    id,
    secret,
  };

  return client;
}
