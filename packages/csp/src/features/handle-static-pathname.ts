import { MetricName } from '../constants/metric-name.js';
import {
  FAVICON_RESPONSE_BODY,
  FAVICON_RESPONSE_INIT,
  ROBOTS_RESPONSE_BODY,
  ROBOTS_RESPONSE_INIT,
} from '../constants/responses.js';
import { StaticPathname } from '../constants/static-pathname.js';
import type CspFetchHandler from '../csp-fetch-handler.js';

export default function handleStaticPathname(
  this: CspFetchHandler,
  pathname: StaticPathname,
): Response {
  switch (pathname) {
    case StaticPathname.Favicon: {
      this.emitPublicMetric(MetricName.Favicon);
      return new Response(FAVICON_RESPONSE_BODY, FAVICON_RESPONSE_INIT);
    }

    case StaticPathname.Robots: {
      this.emitPublicMetric(MetricName.RobotsTxt);
      return new Response(ROBOTS_RESPONSE_BODY, ROBOTS_RESPONSE_INIT);
    }
  }
}
