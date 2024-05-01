/**
 *   The AuthnID-ID map is a cached map of authentication IDs to user IDs,
 * allowing machines that have seen this association before to look it up faster
 * and cheaper than via the KV namespace.
 */

export interface State {
  readonly expiration: number;
  readonly id: number;
}

export const AUTHN_USER_ID_MAP: Map<string, State> = new Map<string, State>();
