import type SentryIssue from '../../../types/sentry-issue.js';

const ADBLOCK = new Set<string>([
  'Error: CWR: Failed to retrieve Cognito identity: TypeError: Failed to fetch',
  'Error: CWR: Failed to retrieve Cognito identity: TypeError: Load failed',
  'OTLPExporterError: Request Timeout',
]);

const STYLE_SHEET = new Set<string>([
  'Error: Expected managed style sheet to have a parent node.',
  'Error: Expected the AWS UI global style sheet to exist.',
  'Error: Expected the Cloudscape global style sheet to exist.',
  'Error: Expected the Cloudscape Design global style sheet to exist.',
]);

export default function mapSentryIssueToSimple(
  issue: SentryIssue,
): SentryIssue {
  if (ADBLOCK.has(issue.title)) {
    return {
      ...issue,
      title: 'An adblocker blocked a monitoring resource.',
    };
  }

  if (STYLE_SHEET.has(issue.title)) {
    return {
      ...issue,
      title: 'A design system style sheet failed to load.',
    };
  }

  return issue;
}
