import MetricName from '../constants/metric-name.js';
import {
  FAVICON_RESPONSE_BODY,
  FAVICON_RESPONSE_INIT,
  ROBOTS_RESPONSE_BODY,
  ROBOTS_RESPONSE_INIT,
} from '../constants/responses.js';
import { StaticPathname } from '../constants/static-pathname.js';
import getTelemetry from '../utils/get-telemetry.js';

export default function handleStaticPathname(
  pathname: StaticPathname,
): Response {
  const { emitPublicMetric } = getTelemetry();

  switch (pathname) {
    case StaticPathname.Favicon: {
      emitPublicMetric({ name: MetricName.FaviconIco });
      return new Response(FAVICON_RESPONSE_BODY, FAVICON_RESPONSE_INIT);
    }

    case StaticPathname.Robots: {
      emitPublicMetric({ name: MetricName.RobotsTxt });
      return new Response(ROBOTS_RESPONSE_BODY, ROBOTS_RESPONSE_INIT);
    }
  }
}
