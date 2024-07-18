import type Report from './content-security-policy-report.js';

export default interface ContentSecurityPolicyGroup {
  readonly disposition: string;
  readonly effectiveDirective: string;
  readonly originPathname: string;
  readonly urls: readonly Report[];
}
