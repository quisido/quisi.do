export default interface ContentSecurityPolicyReportBody {
  readonly blockedURL: string | null;
  readonly columnNumber: number | null;
  readonly documentURL: string;
  readonly effectiveDirective: string;
  readonly lineNumber: number | null;
  readonly referrer: string | null;
  readonly sourceFile: string | null;
  readonly statusCode: number;

  // Disposition should be 'enforce' | 'report'.
  readonly disposition: string;
}
