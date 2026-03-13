import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import createWhoAmIErrorResponse from './create-whoami-error-response.js';
import WhoAmIResponse from './whoami-response.js';

const BASE = 10;

export default async function lookupAuthnUserId(
  this: AuthnFetchHandler,
  authnIdCookie: string,
): Promise<Response> {
  try {
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
        accessControlAllowOrigin: this.accessControlAllowOrigin,
        code: WhoAmIResponseCode.InvalidAuthnId,
      });
    }

    const userId: number = parseInt(userIdStr, BASE);
    this.setFiscalResponsibility(userId);
    this.setAuthnUserIdInMemory(authnIdCookie, userId);

    this.emitPublicMetric(MetricName.UncachedAuthnId);
    this.emitPrivateMetric(MetricName.UncachedAuthnId, {
      userId,
    });

    return new WhoAmIResponse({
      accessControlAllowOrigin: this.accessControlAllowOrigin,
      code: WhoAmIResponseCode.Uncached,
      id: userId,
    });
  } catch (err: unknown) {
    return createWhoAmIErrorResponse.call(this, err);
  }
}
