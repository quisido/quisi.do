import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FaviconResponse from './favicon-response.js';
import RobotsResponse from './robots-response.js';
import RootResponse from './root-response.js';
import { StaticPathname } from './static-pathname.js';

/**
 *   You can only construct a `Response` during a request, so we must keep these
 * parameters deconstructed for now.
 *
 * https://dev.to/kleeut/
 *   cloudflare-workers-some-functionality-can-only-
 *   be-performed-while-handling-a-request-3bne
 */

export default function handleStaticPathname(
  this: AuthnFetchHandler,
  pathname: StaticPathname,
): Response {
  const { emitPublicMetric } = this;
  switch (pathname) {
    case StaticPathname.Favicon: {
      emitPublicMetric(MetricName.FaviconIco);
      return new FaviconResponse();
    }

    case StaticPathname.Robots: {
      emitPublicMetric(MetricName.RobotsTxt);
      return new RobotsResponse();
    }

    case StaticPathname.Root: {
      emitPublicMetric(MetricName.RootPathname);

      const { host } = this;
      return new RootResponse(host);
    }
  }
}
