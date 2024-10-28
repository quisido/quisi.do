import type Worker from '@quisido/worker';
import { StatusCode } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import getCookieDomain from '../get-cookie-domain.js';
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
  this: Worker,
  pathname: StaticPathname,
): Response {
  switch (pathname) {
    case StaticPathname.Favicon: {
      this.emitPublicMetric({ name: MetricName.FaviconIco });
      return new FaviconResponse();
    }

    case StaticPathname.Robots: {
      this.emitPublicMetric({ name: MetricName.RobotsTxt });
      return new RobotsResponse();
    }

    case StaticPathname.Root: {
      this.emitPublicMetric({ name: MetricName.RootPathname });
      const cookieDomain: string = getCookieDomain.call(this);
      return new Response(null, {
        status: StatusCode.PermanentRedirect,

        headers: new Headers({
          Location: `htttps://${cookieDomain}/`,
        }),
      });
    }
  }
}
