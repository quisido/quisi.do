import MetricName from '../constants/metric-name.js';
import ReservedPathname from '../constants/reserved-pathname.js';
import {
  FAVICON_RESPONSE_BODY,
  FAVICON_RESPONSE_INIT,
  ROBOTS_RESPONSE_BODY,
  ROBOTS_RESPONSE_INIT,
} from '../constants/responses.js';
import getTelemetry from '../utils/get-telemetry.js';

export default function handleReservedPathname(
  pathname: ReservedPathname,
): Response {
  const { emitPublicMetric } = getTelemetry();

  switch (pathname) {
    case ReservedPathname.Favicon: {
      emitPublicMetric({ name: MetricName.FaviconIco });
      return new Response(FAVICON_RESPONSE_BODY, FAVICON_RESPONSE_INIT);
    }

    case ReservedPathname.Robots: {
      emitPublicMetric({ name: MetricName.RobotsTxt });
      return new Response(ROBOTS_RESPONSE_BODY, ROBOTS_RESPONSE_INIT);
    }
  }
}
