import type { ReactElement } from 'react';
import REPORT_URI_KEYS from '../../constants/report-uri-keys';

const REPORT_URI = 'https://cscdn.report-uri.com/r/d/csp/enforce';

export default function ReportUri(): ReactElement {
  return (
    <>
      <script id="csp-report-uri" type="text/json">
        {JSON.stringify({
          keys: REPORT_URI_KEYS,
          reportUri: REPORT_URI,
        })}
      </script>
      <script
        async
        crossOrigin="anonymous"
        integrity="sha256-/u7ebXQXcESMpl6YCvyBEqs83Wt+JpsaMvO8sXFbIH0="
        src="https://cdn.report-uri.com/libs/report-uri-js/1.0.0/report-uri-js.min.js"
      />
    </>
  );
}
