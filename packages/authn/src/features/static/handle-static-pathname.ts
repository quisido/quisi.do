import { MetricName } from '../../constants/metric-name.js';
import { emitPublicMetric } from '../../constants/worker.js';
import FaviconResponse from './favicon-response.js';
import RobotsResponse from './robots-response.js';
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
  pathname: StaticPathname,
): Response {
  switch (pathname) {
    case StaticPathname.Favicon: {
      emitPublicMetric({ name: MetricName.FaviconIco });
      return new FaviconResponse();
    }

    case StaticPathname.Robots: {
      emitPublicMetric({ name: MetricName.RobotsTxt });
      return new RobotsResponse();
    }
  }
}