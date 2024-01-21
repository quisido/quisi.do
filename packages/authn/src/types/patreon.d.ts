declare module 'patreon' {
  import type { JsonApiDataStore } from 'jsonapi-datastore';

  interface ApiResult {
    readonly rawJson: JsonApiDocument;
    readonly response: Response;
    readonly store: JsonApiDataStore;
  }

  type ClientPathname =
    | `/campaigns/${string}/pledges`
    | '/current_user'
    | '/current_user/campaigns';

  interface JsonApi {
    readonly ext?: readonly string[];
    readonly meta?: Record<number | string | symbol, unknown>;
    readonly profile?: readonly string[];
    readonly version?: string;
  }

  interface JsonApiData {
    readonly data: unknown;
  }

  type JsonApiDocument = (JsonApiData | JsonApiErrors) & JsonApiDocumentBase;

  interface JsonApiDocumentBase {
    readonly included?: readonly Resource[];
    readonly jsonapi?: JsonApi;
    readonly links?: Record<number | string | symbol, Link>;
    readonly meta: Record<number | string | symbol, unknown>;
  }

  interface JsonApiErrors {
    readonly errors: readonly unknown[];
  }

  interface JsonApiUrlOptions {
    readonly fields?: Record<number | string | symbol, unknown>;
    readonly includes?: unknown;
  }

  interface Link {
    readonly describedby?: Link | string | null;
    readonly href: string;
    readonly hreflang: string | readonly string[];
    readonly meta?: Record<number | string | symbol, unknown>;
    readonly rel?: string;
    readonly title?: string;
    readonly type?: string;
  }

  interface OAuthClient {
    readonly getTokens: (
      code: string | readonly string[] | undefined,
      uri: string,
    ) => Promise<TokensResponse>;
  }

  type OneOf<A, B> = A | (A & B) | B;

  interface Relationship {
    readonly data: Resource;
    readonly meta: Record<number | string | symbol, unknown>;
    readonly links: OneOf<
      Record<'related', Link | string | null>,
      Record<'self', Link | string | null>
    >;
  }

  type Resource = (
    | Record<'id', string>
    | Partial<Record<'lid', string | undefined>>
  ) &
    ResourceBase;

  interface ResourceBase {
    readonly attributes?: Record<number | string | symbol, unknown>;
    readonly links?: Record<number | string | symbol, Link>;
    readonly meta?: Record<number | string | symbol, unknown>;
    readonly relationships?: Partial<Record<string, Relationship>>;
    readonly type: string;
  }

  interface TokensResponse {
    readonly access_token: string;
    readonly expires_in: string;
    readonly refresh_token: string;
    readonly scope: string;
    readonly token_type: 'Bearer';
  }

  export const oauth: (clientId: string, clientSecret: string) => OAuthClient;

  export const jsonApiURL: (
    pathname: ClientPathname,
    options: JsonApiUrlOptions,
  ) => void;

  export const patreon: (
    accessToken: string,
  ) => ((pathname: ClientPathname) => Promise<ApiResult>) &
    ((pathname: ClientPathname, callback: (result: ApiResult) => void) => void);
}
