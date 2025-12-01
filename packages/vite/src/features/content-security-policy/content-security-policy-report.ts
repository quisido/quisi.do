import type ContentSecurityPolicyReportBody from '../../types/content-security-policy-report-body.js';

export default interface ContentSecurityPolicyReport extends Pick<
  ContentSecurityPolicyReportBody,
  'columnNumber' | 'lineNumber' | 'sourceFile'
> {
  readonly count: number;
}
