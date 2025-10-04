export default interface ContentSecurityPolicyReportBody {
  readonly blockedURL: string | null;
  readonly columnNumber: number | null;
  readonly disposition: string; // should be'enforce' | 'report'
  readonly documentURL: string;
  readonly effectiveDirective: string;
  readonly lineNumber: number | null;
  readonly referrer: string | null;
  readonly sourceFile: string | null;
  readonly statusCode: number;
}
