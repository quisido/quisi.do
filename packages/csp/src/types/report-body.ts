// https://w3c.github.io/webappsec-csp/#reporting
export default interface ReportBody {
  readonly blockedURL?: string | undefined;
  readonly columnNumber?: number | undefined;
  readonly documentURL: string;
  readonly effectiveDirective: string;
  readonly lineNumber?: number | undefined;
  readonly originalPolicy: string;
  readonly referrer?: string | undefined;
  readonly sample?: string | undefined;
  readonly sourceFile?: string | undefined;
  readonly statusCode: number;

  // `disposition` should be 'enforce' | 'report'.
  readonly disposition: string;
}
