import type SentryIssue from '../../../types/sentry-issue.js';

// TODO: Turn these into individual metrics.
const LOADING_CSS_CHUNK_FAILED = /^Error: Loading CSS chunk \d+ failed.$/;

const TITLES = new Set<string>([
  'Error: ResizeObserver loop completed with undelivered notifications.',
]);

export default function filterSentryNonIssues({
  title,
}: Readonly<SentryIssue>): boolean {
  return (
    !title.startsWith('ChunkLoadError: ') &&
    !LOADING_CSS_CHUNK_FAILED.test(title) &&
    !TITLES.has(title)
  );
}
