import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import WhoAmIResponseInit from './whoami-response-init.js';
import WhoAmIResponse from './whoami-response.js';

const BASE = 10;

export default async function handleWhoAmIFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  // Options
  const { accessControlAllowOrigin, requestMethod } = this;
  if (requestMethod === 'OPTIONS') {
    return new Response(
      null,
      new WhoAmIResponseInit(StatusCode.OK, { accessControlAllowOrigin }),
    );
  }

  // If the user is not authenticated,
  const { authnIdCookie } = this;
  if (typeof authnIdCookie === 'undefined') {
    this.emitPublicMetric(MetricName.MissingAuthnId);
    return new WhoAmIResponse({
      accessControlAllowOrigin,
      code: WhoAmIResponseCode.MissingAuthnId,
    });
  }

  // If the authentication ID is cached in memory,
  const userIdFromMemory: number | undefined =
    this.getAuthnUserIdFromMemory(authnIdCookie);
  if (typeof userIdFromMemory !== 'undefined') {
    this.emitPublicMetric(MetricName.CachedAuthnId);
    this.emitPrivateMetric(MetricName.CachedAuthnId, {
      userId: userIdFromMemory,
    });

    return new WhoAmIResponse({
      accessControlAllowOrigin,
      code: WhoAmIResponseCode.Cached,
      id: userIdFromMemory,
    });
  }

  // Throttle
  const { ip, throttleWhoAmIByIp } = this;
  if (throttleWhoAmIByIp(ip)) {
    this.emitPublicMetric(MetricName.WhoAmIThrottled);
    this.emitPrivateMetric(MetricName.WhoAmIThrottled, {
      ip,
    });

    return new WhoAmIResponse({
      accessControlAllowOrigin,
      code: WhoAmIResponseCode.Throttled,
      status: StatusCode.TooManyRequests,
    });
  }

  const userIdStr: string | null = await this.getKVNamespaceText(
    'AUTHN_USER_IDS',
    authnIdCookie,
  );

  /**
   *   Authentication is eventually consistent. We don't want to delete the
   * invalid authentication cookie in case the ID exists in the future.
   */
  if (userIdStr === null) {
    this.emitPublicMetric(MetricName.InvalidAuthnId);
    this.emitPrivateMetric(MetricName.InvalidAuthnId, {
      authnId: authnIdCookie,
    });

    return new WhoAmIResponse({
      accessControlAllowOrigin,
      code: WhoAmIResponseCode.InvalidAuthnId,
    });
  }

  // User found! 🎉
  const userId: number = parseInt(userIdStr, BASE);
  this.setAuthnUserIdInMemory(authnIdCookie, userId);

  this.emitPublicMetric(MetricName.UncachedAuthnId);
  this.emitPrivateMetric(MetricName.UncachedAuthnId, {
    authnIdCookie,
    userId,
  });

  return new WhoAmIResponse({
    accessControlAllowOrigin,
    code: WhoAmIResponseCode.Uncached,
    id: userId,
  });
}
