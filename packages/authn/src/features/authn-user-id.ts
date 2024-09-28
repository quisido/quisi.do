/**
 *   The AuthnID/UserID map is a cached map of authentication IDs to user IDs,
 * allowing machines that have seen this association before to look it up faster
 * and cheaper than via the KV namespace.
 */

import type Worker from '@quisido/worker';
import { MetricName } from '../constants/metric-name.js';
import { MILLISECONDS_PER_DAY } from '../constants/time.js';

interface State {
  readonly expiration: number;
  readonly userId: number;
}

const AUTHN_USER_ID_MAP: Map<string, State> = new Map<string, State>();

export function getAuthnUserIdFromMemory(
  this: Worker,
  authnId: string,
): number | undefined {
  const state: State | undefined = AUTHN_USER_ID_MAP.get(authnId);
  if (typeof state === 'undefined') {
    return;
  }

  // Clean up! The cache has expired. 🧼
  const { expiration, userId } = state;
  if (expiration < this.getNow()) {
    AUTHN_USER_ID_MAP.delete(authnId);

    this.emitPublicMetric({
      expiration,
      name: MetricName.ExpiredAuthnId,
    });

    this.emitPrivateMetric({
      expiration,
      name: MetricName.ExpiredAuthnId,
      userId,
    });

    return;
  }

  return userId;
};

export function setAuthnUserIdInMemory(
  this: Worker,
  authnId: string,
  userId: number,
): void {
  AUTHN_USER_ID_MAP.set(authnId, {
    expiration: this.getNow() + MILLISECONDS_PER_DAY,
    userId,
  });
};
