import { type ReactElement } from 'react';

/**
 *   Technical debt: NextJS will encode HTML entities in `meta` tags' `content`
 * property, making the JSON invalid. A solution must be found before the Report
 * URI headers can be added.
 */

interface ReportToEndpoint {
  readonly url: string;
}

interface NetworkErrorLogging {
  readonly include_subdomains: boolean;
  readonly max_age: number;
  readonly report_to: string;
}

interface ReportToContent {
  readonly endpoints: readonly ReportToEndpoint[];
  readonly group: string;
  readonly include_subdomains: boolean;
  readonly max_age: number;
}

const NEL_CONTENT: string = JSON.stringify({
  include_subdomains: true,
  max_age: 31536000,
  report_to: 'default',
} satisfies NetworkErrorLogging);

const REPORT_TO_CONTENT: string = JSON.stringify({
  group: 'default',
  include_subdomains: true,
  max_age: 31536000,
  endpoints: [
    {
      url: 'https://cscdn.report-uri.com/a/d/g',
    },
  ],
} satisfies ReportToContent);

export default function ReportUri(): ReactElement {
  return (
    <>
      <meta httpEquiv="Report-To" content={REPORT_TO_CONTENT} />
      <meta httpEquiv="NEL" content={NEL_CONTENT} />
    </>
  );
}
