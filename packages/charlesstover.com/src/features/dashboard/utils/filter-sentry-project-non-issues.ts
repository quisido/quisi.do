import type SentryProjectIssue from '../../../types/sentry-project-issue';

// TODO: Turn these into individual metrics.
const LOADING_CSS_CHUNK_FAILED = /^Error: Loading CSS chunk \d+ failed.$/;

const TITLES: Set<string> = new Set([
  'Error: CWR: Failed to retrieve Cognito identity: TypeError: Load failed',
  'Error: Expected managed style sheet to have a parent node.',
  'Error: Expected the AWS UI global style sheet to exist.',
  'Error: Expected the Cloudscape global style sheet to exist.',
  'Error: Expected the Cloudscape Design global style sheet to exist.',
  'Error: ResizeObserver loop completed with undelivered notifications.',
]);

export default function filterSentryProjectNonIssues({
  title,
}: Readonly<SentryProjectIssue>): boolean {
  return (
    !title.startsWith('ChunkLoadError: ') &&
    !LOADING_CSS_CHUNK_FAILED.test(title) &&
    !TITLES.has(title)
  );
}
